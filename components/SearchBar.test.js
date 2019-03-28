import React from "react";
import renderer from "react-test-renderer";
import SearchBar from "./SearchBar";

it("renders without exploding", () => {
  renderer.create(<SearchBar />);
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<SearchBar />);
  expect(cmp.toJSON()).toMatchSnapshot();
});
