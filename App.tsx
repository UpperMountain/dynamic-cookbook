import React from "react";
import { StatusBar } from "react-native";
import { Font, AppLoading } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { RootNavigator } from "./screens";
import Sentry from "sentry-expo";

// Create root app navigator
const AppContainer = createAppContainer(RootNavigator);

// Register Sentry for error reporting
Sentry.config(
  "https://40e9befbb61c4ba9b0e3e2d181fd24f0@sentry.io/1464818"
).install();

export default class App extends React.Component {
  state = { ready: false };

  _loadResources = async () => {
    // Load all fonts and assets

    await Font.loadAsync({
      ...MaterialIcons.font
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
