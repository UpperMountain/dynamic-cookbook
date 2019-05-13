import React from "react";
import TestRenderer from "react-test-renderer";
import Timer from "./Timer";

describe("Timer", () => {
  it("should render a timer without exploding", () => {
    const smoke = TestRenderer.create(
      <Timer
        timer={{
          duration: 10,
          until: "",
          elapsed: 0
        }}
      />
    );
    smoke.unmount();
  });

  it("should render a timer which desplays 2h 12m 8s", () => {
    const cmp = TestRenderer.create(
      <Timer
        timer={{
          duration: 7928,
          until: "",
          elapsed: 0
        }}
      />
    );
    expect(cmp.toJSON()).toMatchSnapshot();
    cmp.unmount();
  });
});
