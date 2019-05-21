import React from "react";
import StepView, { StepAction } from "./StepView";
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

describe("<StepAction/>", () => {
  it("should render without exploding", () => {
    renderer
      .create(<StepAction until="until text" onPress={jest.fn()} />)
      .unmount();
  });

  it("should pass snapshot tests", () => {
    const cmp = renderer.create(
      <>
        <StepAction until="until text" onPress={jest.fn()} />
        <StepAction
          timer={true}
          remaining={10000}
          until="until text"
          onPress={jest.fn()}
        />
        <StepAction
          timer={true}
          remaining={100}
          until="until text"
          onPress={jest.fn()}
        />
        <StepAction
          timer={true}
          remaining={10}
          until="until text"
          onPress={jest.fn()}
        />
        <StepAction timer={true} until="until text" onPress={jest.fn()} />
      </>
    );
    expect(cmp.toJSON()).toMatchSnapshot();
    cmp.unmount();
  });

  it("should throw if props make no sense", () => {
    // don't print the react error
    jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

    expect(() => {
      renderer
        .create(
          <StepAction remaining={1} until="until text" onPress={jest.fn()} />
        )
        .unmount();
    }).toThrow();

    // @ts-ignore
    console.error.mockClear();
  });
});
