import React from "react";
import { Alert, StatusBar, AsyncStorage } from "react-native";
import { Constants, Segment, Font, AppLoading, ErrorRecovery } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { RootNavigator } from "./screens";
import { trackNavStateChange } from "./lib/screenTracking";
import { MealContextProvider } from "./lib/mealContext";
import Sentry from "sentry-expo";

export const navStatePersistenceKey = "navStatePersistence";

// Create root app navigator
const AppContainer = createAppContainer(RootNavigator);

// Register Sentry for error reporting
Sentry.config(
  "https://40e9befbb61c4ba9b0e3e2d181fd24f0@sentry.io/1464818"
).install();

if (!__DEV__) {
  // Only initialize Segment in prod.
  // Avoids warnings in dev.
  Segment.initialize({
    androidWriteKey: "vHomtRC0DwAPbwS0ztqljf2tUmgrdy19",
    iosWriteKey: "GIwWSlcucci2UYi1eEHyyBqHqM9X7g33"
  });
  Segment.identify(Constants.installationId);
  console.log("segment: initialized");
} else {
  console.log("segment: not initializing in dev mode");
}

export default class App extends React.Component {
  state = { ready: false };

  crashed: boolean = false;
  constructor(props: any) {
    super(props);

    // @ts-ignore
    const { exp } = this.props;
    if (typeof exp.errorRecovery !== "undefined") {
      this.crashed = true;
    }

    ErrorRecovery.setRecoveryProps({ didCrash: true });
  }

  private async loadResources(this: any) {
    // Reset storage on crash
    if (this.crashed) {
      if (!__DEV__) {
        Alert.alert(
          "Issue reported",
          "Cookie just closed unexpectedly.\n\nThis issue has been reported to the developers, and the app has been reset to (hopefully) working condition."
        );
      } else {
        console.log("App.tsx: cleared AsyncStorage on crash");
      }
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
          <MealContextProvider>
            <AppContainer
              onNavigationStateChange={trackNavStateChange}
              persistenceKey={navStatePersistenceKey}
            />
          </MealContextProvider>
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
