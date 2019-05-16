import RecipeIndex from "./RecipeIndex";
import { recipes } from "../data";

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
