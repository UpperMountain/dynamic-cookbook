import React from "react";
import { Alert, StatusBar, AsyncStorage } from "react-native";
import { Font, AppLoading, ErrorRecovery } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { RootNavigator } from "./screens";
import Sentry from "sentry-expo";

export const navStatePersistenceKey = "navStatePersistence";

// Create root app navigator
const AppContainer = createAppContainer(RootNavigator);

// Register Sentry for error reporting
Sentry.config(
  "https://40e9befbb61c4ba9b0e3e2d181fd24f0@sentry.io/1464818"
).install();

export default class App extends React.Component {
  state = { ready: false };

  crashed: boolean = false;
  constructor(props: any) {
    super(props);

    // @ts-ignore
    const { exp } = this.props;
    if (typeof exp.errorRecovery !== "undefined") {
      console.log("found crash");
      this.crashed = true;
    }

    console.log("set recovery props");
    ErrorRecovery.setRecoveryProps({ didCrash: true });
  }

  private async loadResources(this: any) {
    // Reset storage on crash
    console.log("loadResources()");
    if (this.crashed) {
      console.log("crash alert");
      Alert.alert(
        "Issue reported",
        "Cookie just closed unexpectedly.\n\nThis issue has been reported to the developers, and the app has been reset to (hopefully) working condition."
      );
      await AsyncStorage.clear();
    }

    // Load all fonts and assets
    await Font.loadAsync({
      ...MaterialIcons.font
    });
  }

  render() {
    const { ready } = this.state;

    if (ready) {
      return (
        <>
          <StatusBar barStyle="default" />
          <AppContainer persistenceKey={navStatePersistenceKey} />
        </>
      );
    }
    return (
      <AppLoading
        startAsync={this.loadResources.bind(this)}
        onFinish={() => this.setState({ ready: true })}
      />
    );
  }
}
