import React from "react";
import Search from "./Search";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import renderer from "react-test-renderer";

const Nav = createSwitchNavigator({ Search });

const AppContainer = createAppContainer(Nav);

it("should render without exploding", () => {
  renderer.create(<AppContainer />);
});
