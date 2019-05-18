import React from "react";
import { Text } from "react-native";
import Card from "./Card";
import Renderer from "react-test-renderer";

it("should render without exploding", () => {
  Renderer.create(
    <Card>
      <Text>test</Text>
    </Card>
  ).unmount();
});

it("should match snapshot", () => {
  const cmp = Renderer.create(
    <Card
      style={{ backgroundColor: "red" }}
      innerStyle={{ backgroundColor: "blue" }}
      shadowAmt={0.5}
    >
      <Text>test</Text>
    </Card>
  );
  expect(cmp.toJSON()).toMatchSnapshot();
  cmp.unmount();
});
