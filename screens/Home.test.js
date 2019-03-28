import React from "react";
import renderer from "react-test-renderer";
import Home from "./Home";

it("renders without exploding", () => {
  renderer.create(<Home />);
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<Home />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
