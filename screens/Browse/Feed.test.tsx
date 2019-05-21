import React from "react";
import Feed from "./Feed";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import renderer from "react-test-renderer";

const Nav = createSwitchNavigator({ Feed });

const AppContainer = createAppContainer(Nav);

it("should render without exploding", () => {
  renderer.create(<AppContainer />);
});
