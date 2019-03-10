import React from "react";
import RoundedButton from "./RoundedButton";
import renderer from "react-test-renderer";

it("should render something without exploding", () => {
  const cmp = renderer.create(<RoundedButton text="test" />);
});

it("should render a plain button", () => {
  const cmp = renderer.create(<RoundedButton text="test" />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
