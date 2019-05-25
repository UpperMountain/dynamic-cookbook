import React from "react";
import StepView from "./StepView";
import renderer from "react-test-renderer";

describe("<StepView/>", () => {
  it("should render without exploding", () => {
    renderer
      .create(
        <StepView
          step={{
            kind: "step",
            until: "[until text]",
            name: "[step name]",
            requires: []
          }}
          num={10}
        />
      )
      .unmount();
  });

  it("should pass snapshot tests", () => {
    const cmp = renderer.create(
      <>
        <StepView
          num={1}
          step={{
            kind: "step",
            until: "until 1",
            name: "name 1",
            body: "body 1",
            requires: []
          }}
        />
        <StepView
          num={2}
          step={{
            kind: "step",
            until: "until 2",
            name: "name 2",
            requires: []
          }}
        />
      </>
    );
    expect(cmp.toJSON()).toMatchSnapshot();
    cmp.unmount();
  });
});
