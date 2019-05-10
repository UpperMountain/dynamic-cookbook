import React from "react";
import renderer from "react-test-renderer";
import Timer from "./Timer";

describe("Timer", () => {
  it("should render a timer without exploding", () => {
    renderer.create(<Timer seconds={10} />);
  });

  it("should render a timer which desplays 2h 12m 8s", () => {
    const cmp = renderer.create(<Timer seconds={7928} />);
    expect(cmp.toJSON()).toMatchSnapshot();
  });
});
