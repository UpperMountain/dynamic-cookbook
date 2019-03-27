import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Constants, Font, AppLoading, Alert } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import { RootNavigator } from "./screens";
import { createAppContainer } from "react-navigation";

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
      raleway: require("./assets/fonts/Raleway-Regular.ttf"),
      "raleway-medium": require("./assets/fonts/Raleway-Medium.ttf"),
      "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
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
    } else {
      return (
        <AppLoading
          startAsync={this._loadResources}
          onFinish={() => this.setState({ ready: true })}
        />
      );
    }
  }
}
