import React from "react";
import LoginPage from "./Login";
import renderer from "react-test-renderer";

it("renders without exploding", () => {
  const cmp = renderer.create(<LoginPage />);
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<LoginPage />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
