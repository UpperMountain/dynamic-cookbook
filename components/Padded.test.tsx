import React from "react";
import { Text } from "react-native";
import Padded from "./Padded";
import renderer from "react-test-renderer";

it("should render without exploding", () => {
  renderer
    .create(
      <Padded all>
        <Text>testing</Text>
      </Padded>
    )
    .unmount();
});

it("should pass snapshow tests", () => {
  const cmp = renderer.create(
    <>
      <Padded top>
        <Text>testing</Text>
      </Padded>
      <Padded bottom>
        <Text>testing</Text>
      </Padded>
      <Padded left>
        <Text>testing</Text>
      </Padded>
      <Padded right>
        <Text>testing</Text>
      </Padded>
      <Padded vertical>
        <Text>testing</Text>
      </Padded>
      <Padded horizontal>
        <Text>testing</Text>
      </Padded>
      <Padded all>
        <Text>testing</Text>
      </Padded>
    </>
  );
  expect(cmp.toJSON()).toMatchSnapshot();
  cmp.unmount();
});

it("should consistently handle multiple parameters", () => {
  const cmp = renderer.create(
    <>
      <Padded top={1} left={0.5}>
        <Text>testing</Text>
      </Padded>
      <Padded bottom={2} horizontal={3}>
        <Text>testing</Text>
      </Padded>
      <Padded all={3} left={10}>
        <Text>testing</Text>
      </Padded>
      <Padded left={2} bottom={1}>
        <Text>testing</Text>
      </Padded>
    </>
  );
  expect(cmp.toJSON()).toMatchSnapshot();
  cmp.unmount();
});
