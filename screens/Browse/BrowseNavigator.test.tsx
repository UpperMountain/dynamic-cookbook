import React from "react";
import { View } from "react-native";
import createBrowseNavigator from "./BrowseNavigator";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import renderer from "react-test-renderer";

it("should render without exploding", () => {
  const nav = createSwitchNavigator({
    Test: View
  });
  const BrowseNavigator = createBrowseNavigator(nav);
  const AppContainer = createAppContainer(BrowseNavigator);
  renderer.create(<AppContainer />).unmount();
});
