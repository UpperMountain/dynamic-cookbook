import React from "react";
import RecipeList from "./RecipeList";
import renderer from "react-test-renderer";
import { MealCard } from "./MealCard";

it("should render something without exploding", () => {
  const cmp = renderer.create(<RecipeList />);
});

it("should render a list with two meal cards", () => {
  const cmp = renderer.create(
    <RecipeList>
      <MealCard />
      <MealCard />
    </RecipeList>
  );
  expect(cmp.toJSON()).toMatchSnapshot();
});
