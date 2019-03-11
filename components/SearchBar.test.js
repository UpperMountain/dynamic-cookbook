import React from "react";
import SearchBar from "./SearchBar";
import renderer from "react-test-renderer";

it("renders without exploding", () => {
  const cmp = renderer.create(<SearchBar />);
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<SearchBar />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
