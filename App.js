import React from "react";
import { StatusBar } from "react-native";
import { Font, AppLoading } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { RootNavigator } from "./screens";

import raleway from "./assets/fonts/Raleway-Regular.ttf";
import ralewayMedium from "./assets/fonts/Raleway-Medium.ttf";
import ralewayBold from "./assets/fonts/Raleway-Bold.ttf";

const AppContainer = createAppContainer(RootNavigator);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false
    };
  }

  _loadResources = async () => {
    // Load all fonts and assets

    await Font.loadAsync({
      raleway,
      "raleway-medium": ralewayMedium,
      "raleway-bold": ralewayBold,
      ...FontAwesome.font
    });
  };

  render() {
    const { ready } = this.state;

    if (ready) {
      return (
        <>
          <StatusBar barStyle="default" />
          <AppContainer />
        </>
      );
    }
    return (
      <AppLoading
        startAsync={this._loadResources}
        onFinish={() => this.setState({ ready: true })}
      />
    );
  }
}
