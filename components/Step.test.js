import React from "react";
import renderer from "react-test-renderer";
import Step from "./Step";

describe("Step", () => {
  it("should render a step with no leading line", () => {
    const cmp = renderer.create(
      <Step number={1} title={"step one"} body={"this is test body text"} />
    );
    expect(cmp.toJSON()).toMatchSnapshot();
  });

  it("should render a step that does have leading line", () => {
    const cmp = renderer.create(
      <Step
        number={2}
        title={"step two"}
        body={"this step is not a first step so it has a line leading in"}
      />
    );
    expect(cmp.toJSON()).toMatchSnapshot();
  });
});
