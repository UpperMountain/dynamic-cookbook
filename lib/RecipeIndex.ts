import Recipe, { getRecipeDefaults } from "./Recipe";
import { Ingredient, Node } from "./dependencyTree";
import { simplifyGroup } from "./Procedure";
import { walkWhere } from "./walk";
import Fuse, { FuseOptions } from "fuse.js";

// should return something like:
// [
//   { kind: recipe, recipe: <recipe> },
//   { kind: ingredient, ingredient: <ingredient>, foundIn: [<recipe>...] }
// ]

interface RecipeResult {
  kind: "recipe";
  id: string; // recipe ID
  recipe: Recipe;
}

interface IngredientResult {
  kind: "ingredient";
  ingredient: Ingredient;
  foundIn: RecipeResult[];
}

export type QueryResult = RecipeResult | IngredientResult;

export default class RecipeIndex {
  recipes: { [key: string]: Recipe };
  fuse: Fuse<QueryResult>;

  private static fuseOptions: FuseOptions<QueryResult> = {
    threshold: 0.5,
    shouldSort: true,

    // this should work, trust me on this one please
    // @ts-ignore
    keys: [
      { name: "recipe.name", weight: 0.7 },
      { name: "recipe.body", weight: 0.3 },
      { name: "ingredient.name", weight: 0.7 },
      { name: "ingredient.body", weight: 0.3 }
    ]
  };

  constructor(recipes: { [key: string]: Recipe }) {
    this.recipes = recipes;
    type item = [string, Recipe];

    // index the recipes
    const recipeItems = Object.entries(recipes).map(
      ([id, recipe]: item): RecipeResult => ({
        kind: "recipe",
        id,
        recipe
      })
    );

    // index the ingredients
    const ingredients: { [key: string]: IngredientResult } = {};
    for (let r of recipeItems) {
      // Run the recipe, gathering its ingredients
      const requires = r.recipe.requires(getRecipeDefaults(r.recipe));
      const roots = simplifyGroup(requires);
      let recipeIngredients: Ingredient[] = [];
      for (let root of roots) {
        const node = root.getNode();
        const ingredientsIter = walkWhere(
          node,
          (el: Node) => el.kind === "ingredient"
        );
        const foundIngredients = [...ingredientsIter] as Ingredient[];
        recipeIngredients = recipeIngredients.concat(foundIngredients);
      }

      // upsert the ingredients into the main mapping
      for (let ing of recipeIngredients) {
        if (!(ing.id in ingredients)) {
          ingredients[ing.id] = {
            kind: "ingredient",
            ingredient: ing,
            foundIn: []
          };
        }

        ingredients[ing.id].foundIn.push(r);
      }
    }

    const allItems = [...recipeItems, ...Object.values(ingredients)];
    this.fuse = new Fuse(allItems, RecipeIndex.fuseOptions);
  }

  // cutoff: between 0 (only allow perfect matches) and 1 (allow awful matches)
  find(query: string): QueryResult[] {
    return this.fuse.search(query);
  }
}
