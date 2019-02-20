import App from "./App";
import React from "react";
import renderer from "react-test-renderer";

it("renders without exploding", () => {
  const cmp = renderer.create(<App />);
});

it("matches snapshot", () => {
  const cmp = renderer.create(<App />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
