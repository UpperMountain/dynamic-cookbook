import React from "react";
import { Font } from "expo";
import { View } from "react-native";
import LoginPage from "./views/Login";
import Home from "./views/Home";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      raleway: require("./assets/fonts/Raleway-Regular.ttf"),
      "raleway-medium": require("./assets/fonts/Raleway-Medium.ttf"),
      "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        {this.state.fontLoaded ? <Home /> : null}
      </View>
    );
  }
}
