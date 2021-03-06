import React from "react";
import { Alert, StatusBar, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import * as ErrorRecovery from "expo-error-recovery";
import * as Font from "expo-font";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { RootNavigator } from "./screens";
import { trackNavStateChange } from "./lib/screenTracking";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MealContextProvider } from "./lib/mealContext";
import * as Sentry from "sentry-expo";
import * as Segment from "expo-analytics-segment";

// Create root app navigator
const AppContainer = createAppContainer(RootNavigator);

// Register Sentry for error reporting
Sentry.init({
  dsn: "https://40e9befbb61c4ba9b0e3e2d181fd24f0@sentry.io/1464818",
  enableInExpoDevelopment: false
});

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
    if (exp.errorRecovery && exp.errorRecovery.didCrash) {
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
          <SafeAreaProvider>
            <MealContextProvider>
              <AppContainer onNavigationStateChange={trackNavStateChange} />
            </MealContextProvider>
          </SafeAreaProvider>
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
