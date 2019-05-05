import React from "react";
import renderer from "react-test-renderer";
import Categories from "./Categories";

it("renders without exploding", () => {
  renderer.create(<Categories />);
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<Categories />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
