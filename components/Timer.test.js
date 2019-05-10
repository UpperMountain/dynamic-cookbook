import React from "react";
import TestRenderer from "react-test-renderer";
import Timer from "./Timer";

describe("Timer", () => {
  it("should render a timer without exploding", () => {
    const smoke = TestRenderer.create(<Timer seconds={10} />);
    smoke.unmount();
  });

  it("should render a timer which desplays 2h 12m 8s", () => {
    const cmp = TestRenderer.create(<Timer seconds={7928} />);
    expect(cmp.toJSON()).toMatchSnapshot();
    cmp.unmount();
  });
});
