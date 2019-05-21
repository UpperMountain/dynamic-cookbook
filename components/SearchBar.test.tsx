import React from "react";
import SearchBar from "./SearchBar";
import renderer from "react-test-renderer";

// disable console warnings about blur()
jest.spyOn(global.console, "warn").mockImplementation(() => jest.fn());

it("should render without exploding", () => {
  renderer.create(<SearchBar value="" onChange={jest.fn()} />).unmount();
});

it("passes snapshot tests", () => {
  const cmp = renderer.create(<SearchBar value="" onChange={jest.fn()} />);
  expect(cmp.toJSON()).toMatchSnapshot();
  cmp.unmount();
});
