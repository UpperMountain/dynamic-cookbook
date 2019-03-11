import React from "react";
import App from "./App";
import renderer from "react-test-renderer";

jest.mock("./views/Home.js", () => "test"); // shallow render Home

it("should render without exploding", () => {
  const cmp = renderer.create(<App />);
});
