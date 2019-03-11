import React from "react";
import Toast from "./Toast";
import renderer from "react-test-renderer";

it("renders without exploding", () => {
  const cmp = renderer.create(<Toast />);
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<Toast />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
