import React from "react";
import renderer from "react-test-renderer";
import { MealCard } from "./MealCard";

it("should render without exploding", () => {
  renderer.create(<MealCard />);
});

it("should pass snapshot tests", () => {
  const cmp = renderer.create(<MealCard />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
