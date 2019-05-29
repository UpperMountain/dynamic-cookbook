import React from "react";
import { Text } from "react-native";
import LowerThird from "./LowerThird";
import renderer from "react-test-renderer";

it("should render without exploding", () => {
  renderer
    .create(
      <LowerThird third={<Text>third</Text>}>
        <Text>contents</Text>
      </LowerThird>
    )
    .unmount();
});

it("should pass snapshot tests", () => {
  const cmp = renderer.create(
    <>
      <LowerThird third={<Text>third</Text>}>
        <Text>contents</Text>
      </LowerThird>
      <LowerThird>
        <Text>contents</Text>
      </LowerThird>
    </>
  );

  expect(cmp.toJSON()).toMatchSnapshot();
  cmp.unmount();
});
