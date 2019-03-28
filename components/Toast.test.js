import React from "react";
import renderer from "react-test-renderer";
import Toast from "./Toast";

it("renders without exploding", () => {
  renderer.create(<Toast />);
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<Toast />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
