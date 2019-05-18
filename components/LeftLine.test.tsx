import React from "react";
import { Text } from "react-native";
import LeftLine from "./LeftLine";
import renderer from "react-test-renderer";

it("should render without exploding", () => {
  renderer.create(<LeftLine />).unmount();
});

it("should match snapshots", () => {
  const test = (
    <>
      <LeftLine aside={<Text>11</Text>}>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
      </LeftLine>
      <LeftLine sideWidth={100} aside={<Text>11</Text>}>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
      </LeftLine>
      <LeftLine style={{ height: 50 }} />
      <LeftLine aside={<Text>11</Text>} overlap>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
      </LeftLine>
      <LeftLine hidden aside={<Text>11</Text>} overlap>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
        <Text>contents</Text>
      </LeftLine>
    </>
  );
  const cmp = renderer.create(test);
  expect(cmp.toJSON()).toMatchSnapshot();
});
