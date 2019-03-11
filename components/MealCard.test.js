import React from "react";
import { MealCard } from "./MealCard";
import renderer from "react-test-renderer";

it("should render without exploding", () => {
  const cmp = renderer.create(<MealCard />);
});

it("should pass snapshot tests", () => {
  const cmp = renderer.create(<MealCard />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
