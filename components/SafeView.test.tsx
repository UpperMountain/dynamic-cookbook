import React from "react";
import { Text } from "react-native";
import SafeView from "./SafeView";
import renderer from "react-test-renderer";

it("should render without exploding", () => {
  renderer
    .create(
      <SafeView>
        <Text>testing</Text>
      </SafeView>
    )
    .unmount();
});

it("should pass snapshot tests", () => {
  const cmp = renderer.create(
    <SafeView>
      <Text>testing</Text>
    </SafeView>
  );
  expect(cmp.toJSON()).toMatchSnapshot();
  cmp.unmount();
});

it("should consistently handle a style prop", () => {
  const cmp = renderer.create(
    <SafeView style={{ backgroundColor: "red" }}>
      <Text>testing</Text>
    </SafeView>
  );
  expect(cmp.toJSON()).toMatchSnapshot();
  cmp.unmount();
});
