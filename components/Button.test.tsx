import React from "react";
import Button from "./Button";
import renderer from "react-test-renderer";

it("should render without exploding", () => {
  renderer.create(<Button iconName="home">Home test</Button>).unmount();
});

it("should pass snapshot tests", () => {
  const cmp = renderer.create(
    <>
      <Button iconName="home">Home test</Button>
      <Button iconName="home" />
      <Button iconName="home" onPress={jest.fn()} />
    </>
  );
  expect(cmp.toJSON()).toMatchSnapshot();
  cmp.unmount();
});
