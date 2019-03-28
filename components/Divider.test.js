import React from "react";
import renderer from "react-test-renderer";
import { HR, SpacedView } from "./Divider";

describe("SpacedView", () => {
  it("renders without exploding", () => {
    renderer.create(<SpacedView>Testing</SpacedView>);
  });

  it("passes snapshot tests", () => {
    const cmp = renderer.create(<SpacedView>Testing</SpacedView>);
    expect(cmp.toJSON()).toMatchSnapshot();
  });
});

describe("HR", () => {
  it("renders without exploding", () => {
    renderer.create(
      <SpacedView>
        Test1
        <HR />
        Test2
      </SpacedView>
    );
  });

  it("passes snapshot tests", () => {
    const cmp = renderer.create(
      <SpacedView>
        Test1
        <HR />
        Test2
        <HR />
        Test3
      </SpacedView>
    );
    expect(cmp.toJSON()).toMatchSnapshot();
  });
});
