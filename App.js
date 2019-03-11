import React from "react";
import { Font, AppLoading, Alert } from "expo";
import { View } from "react-native";
import LoginPage from "./views/Login";
import Home from "./views/Home";
import { FontAwesome } from "@expo/vector-icons";

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
      return <Home />;
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
