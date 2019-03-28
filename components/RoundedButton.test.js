import React from "react";
import renderer from "react-test-renderer";
import RoundedButton from "./RoundedButton";

it("should render something without exploding", () => {
  renderer.create(<RoundedButton text="test" />);
});

it("should render a plain button", () => {
  const cmp = renderer.create(<RoundedButton text="test" />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
