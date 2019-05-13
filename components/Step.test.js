import React from "react";
import renderer from "react-test-renderer";
import StepView from "./Step";

describe("Step", () => {
  it("should render a step with no leading line", () => {
    const cmp = renderer.create(
      <StepView number={1} title={"step one"} body={"this is test body text"} />
    );
    expect(cmp.toJSON()).toMatchSnapshot();
  });

  it("should render a step that does have leading line", () => {
    const cmp = renderer.create(
      <StepView
        number={2}
        title={"step two"}
        body={"this step is not a first step so it has a line leading in"}
      />
    );
    expect(cmp.toJSON()).toMatchSnapshot();
  });
});
