import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import Carousel from "./Carousel";

it("should render something without exploding", () => {
  renderer.create(<Carousel />);
});

it("should render a list with two items", () => {
  const cmp = renderer.create(
    <Carousel>
      {/* don't actually render meal cards, so we only snapshot this component */}
      <Text>Test1</Text>
      <Text>Test2</Text>
    </Carousel>
  );

  expect(cmp.toJSON()).toMatchSnapshot();
});
