import React from "react";
import StepAction from "./StepAction";
import renderer from "react-test-renderer";

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
