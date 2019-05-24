import React from "react";
import ListItem from "./ListItem";
import renderer from "react-test-renderer";

it("should render without exploding", () => {
  renderer.create(<ListItem name="test name" body="test body" />).unmount();
});

it("should pass snapshot tests", () => {
  const cmp = renderer.create(
    <>
      <ListItem name="test name" body="test body" />
      <ListItem name="nested outer">
        <ListItem name="nested inner" />
      </ListItem>
      <ListItem
        name="with image"
        body="ooooohh pretty"
        image={require("../assets/images/CookieLogo.png")}
      />
      <ListItem name="with press handler" onPress={jest.fn()} />
      <ListItem name="with custom style" style={{ backgroundColor: "red" }} />
    </>
  );
  expect(cmp.toJSON()).toMatchSnapshot();
  cmp.unmount();
});
