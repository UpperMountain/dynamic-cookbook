import RecipeIndex, { RecipeResult, IngredientResult } from "./RecipeIndex";
import { recipes } from "../data";
import * as Ingredients from "../data/ingredients";

it("should initialize without exploding", async () => {
  const index = new RecipeIndex(recipes);
  await index.ready;
});

it('should return query results for "pancake"', async () => {
  const index = new RecipeIndex(recipes);
  await index.ready;

  const results = index.find("pancake");
  expect(results.length).toBeGreaterThan(0);
  expect(results.some(e => e.kind === "recipe")).toBe(true);
});

it('should return query results for "pncake"', async () => {
  const index = new RecipeIndex(recipes);
  await index.ready;

  const results = index.find("pncake");
  expect(results.length).toBeGreaterThan(0);
  expect(results.some(e => e.kind === "recipe")).toBe(true);
});

it('should return a RecipeResult for "pasta", as the first result', async () => {
  const index = new RecipeIndex(recipes);
  await index.ready;

  const results = index.find("Chai Latte");
  expect(results.length).toBeGreaterThan(0);

  let firstResult = results[0];

  expect(firstResult.kind).toEqual("recipe");
  firstResult = firstResult as RecipeResult;
  expect(firstResult!.recipe).toEqual(recipes.ChaiLatte);
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
