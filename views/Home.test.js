import React from "react";
import Home from "./Home";
import renderer from "react-test-renderer";

it("renders without exploding", () => {
  const cmp = renderer.create(<Home />);
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<Home />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
