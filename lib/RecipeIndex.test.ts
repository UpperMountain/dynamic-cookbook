import RecipeIndex, { RecipeResult, IngredientResult } from "./RecipeIndex";
import { recipes } from "../data";
import * as Ingredients from "../data/ingredients";

it("should initialize without exploding", () => {
  new RecipeIndex(recipes);
});

it('should return query results for "pasta"', () => {
  const index = new RecipeIndex(recipes);
  const results = index.find("pasta");
  expect(results.length).toBeGreaterThan(0);
});

it('should return query results for "pwsta"', () => {
  const index = new RecipeIndex(recipes);
  const results = index.find("pwstu");
  expect(results.length).toBeGreaterThan(0);
});

it('should return query results for "onion"', () => {
  const index = new RecipeIndex(recipes);
  const results = index.find("spaget");
  expect(results.length).toBeGreaterThan(0);
});

it('should return a RecipeResult for "pasta", as the first result', () => {
  const index = new RecipeIndex(recipes);
  const results = index.find("Pasta");
  expect(results.length).toBeGreaterThan(0);

  let firstResult = results[0];

  expect(firstResult.kind).toEqual("recipe");
  firstResult = firstResult as RecipeResult;
  expect(firstResult!.recipe).toEqual(recipes.Pasta);
});

it('should return an IngredientResult for "flour", as the first result', () => {
  const index = new RecipeIndex(recipes);
  const results = index.find("flour");
  expect(results.length).toBeGreaterThan(0);

  let firstResult = results[0];

  expect(firstResult.kind).toEqual("ingredient");
  firstResult = firstResult as IngredientResult;
  expect(firstResult!.ingredient).toBeInstanceOf(Ingredients.Flour);
});
