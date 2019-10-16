import Recipe, { getRecipeDefaults } from "./Recipe";
import { Ingredient, Node, simplifyGroup, walkWhere } from "./graph";
import Fuse, { FuseOptions } from "fuse.js";

// should return something like:
// [
//   { kind: recipe, recipe: <recipe> },
//   { kind: ingredient, ingredient: <ingredient>, foundIn: [<recipe>...] }
// ]

export interface RecipeResult {
  kind: "recipe";
  id: string; // recipe ID
  recipe: Recipe;
}

export interface IngredientResult {
  kind: "ingredient";
  ingredient: Ingredient;
  foundIn: RecipeResult[];
}

export type QueryResult = RecipeResult | IngredientResult;

export default class RecipeIndex {
  // If not ready, the search index is null. Await `this.ready` to get it.
  fuse: Fuse<QueryResult> | null = null;

  // Ready promise
  ready: Promise<Fuse<QueryResult>>;

  private static fuseOptions: FuseOptions<QueryResult> = {
    threshold: 0.5,
    shouldSort: true,

    // this should work, trust me on this one please
    // @ts-ignore
    keys: [
      { name: "recipe.name", weight: 0.4 },
      { name: "recipe.body", weight: 0.2 },
      { name: "ingredient.name", weight: 0.4 }
    ]
  };

  constructor(recipes: { [key: string]: Recipe }) {
    this.ready = this.makeIndex(recipes);
    this.ready.then(fuse => (this.fuse = fuse));
  }

  // This is called by the constructor to index the recipes. It resolves with a working
  // Fuse instance.
  private async makeIndex(recipes: {
    [key: string]: Recipe;
  }): Promise<Fuse<QueryResult>> {
    type item = [string, Recipe];

    // index the recipes
    const recipeItems = Object.entries(recipes).map(
      ([id, recipe]: item): RecipeResult => ({
        kind: "recipe",
        id,
        recipe
      })
    );

    // Map (ingredient.name) => IngredientResult
    const ingredients = new Map<string, IngredientResult>();
    for (const r of recipeItems) {
      // Run the recipe, gathering its ingredients
      const requires = r.recipe.requires(getRecipeDefaults(r.recipe));
      const roots = await simplifyGroup(requires);
      let recipeIngredients: Ingredient[] = [];
      for (const root of roots) {
        const ingredientsIter = walkWhere(
          root,
          (el: Node) => el.kind === "ingredient"
        );
        const foundIngredients = [...ingredientsIter] as Ingredient[];
        recipeIngredients = recipeIngredients.concat(foundIngredients);
      }

      // upsert the ingredients into the main mapping
      for (const ing of recipeIngredients) {
        let stored = ingredients.get(ing.constructor.name);
        if (typeof stored === "undefined") {
          stored = {
            kind: "ingredient",
            ingredient: ing,
            foundIn: []
          };
          ingredients.set(ing.constructor.name, stored);
        }

        stored.foundIn.push(r);
      }
    }

    const allItems = [...recipeItems, ...ingredients.values()];
    return new Fuse(allItems, RecipeIndex.fuseOptions);
  }

  // cutoff: between 0 (only allow perfect matches) and 1 (allow awful matches)
  find(query: string): QueryResult[] {
    // If we're not ready yet, throw.
    if (this.fuse === null) {
      throw new Error("RecipeIndex: not yet ready");
    }

    // Return the search query
    return this.fuse.search(query);
  }
}
