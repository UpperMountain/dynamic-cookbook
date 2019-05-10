import React from "react";
import renderer from "react-test-renderer";
import Interaction from "./Interaction";

describe("Interaction", () => {
  it('should render an interaction card with title "test" ', () => {
    renderer.create(<Interaction />);
  });

  // TODO: write tests for interactions with timers
});
