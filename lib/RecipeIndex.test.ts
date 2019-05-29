import RecipeIndex, { RecipeResult, IngredientResult } from "./RecipeIndex";
import { recipes } from "../data";
import * as Ingredients from "../data/ingredients";

it("should initialize without exploding", async () => {
  const index = new RecipeIndex(recipes);
  await index.ready;
});

it('should return query results for "pasta"', async () => {
  const index = new RecipeIndex(recipes);
  await index.ready;

  const results = index.find("pasta");
  expect(results.length).toBeGreaterThan(0);
});

it('should return query results for "pwsta"', async () => {
  const index = new RecipeIndex(recipes);
  await index.ready;

  const results = index.find("pwstu");
  expect(results.length).toBeGreaterThan(0);
});

it('should return query results for "onion"', async () => {
  const index = new RecipeIndex(recipes);
  await index.ready;

  const results = index.find("spaget");
  expect(results.length).toBeGreaterThan(0);
});

it('should return a RecipeResult for "pasta", as the first result', async () => {
  const index = new RecipeIndex(recipes);
  await index.ready;

  const results = index.find("Pasta");
  expect(results.length).toBeGreaterThan(0);

  let firstResult = results[0];

  expect(firstResult.kind).toEqual("recipe");
  firstResult = firstResult as RecipeResult;
  expect(firstResult!.recipe).toEqual(recipes.Pasta);
});

it('should return an IngredientResult for "flour", as the first result', async () => {
  const index = new RecipeIndex(recipes);
  await index.ready;

  const results = index.find("flour");
  expect(results.length).toBeGreaterThan(0);

  let firstResult = results[0];

  expect(firstResult.kind).toEqual("ingredient");
  firstResult = firstResult as IngredientResult;
  expect(firstResult!.ingredient).toBeInstanceOf(Ingredients.Flour);
});
