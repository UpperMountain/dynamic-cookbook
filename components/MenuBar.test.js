import React from "react";
import MenuBar from "./MenuBar";
import renderer from "react-test-renderer";

it("renders without exploding", () => {
  const cmp = renderer.create(<MenuBar />);
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<MenuBar />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
