import React from "react";
import renderer from "react-test-renderer";
import MyMeal from "./MyMeal";

it("renders something without exploding", () => {
  renderer.create(<MyMeal />);
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<MyMeal />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
