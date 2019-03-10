import React from "react";
import { Font } from "expo";
import { View } from "react-native";
import LoginPage from "./views/Login";

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
      "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
      FontAwesome5FreeSolid: require("./assets/fonts/fontawesome-webfont.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        {this.state.fontLoaded ? <LoginPage /> : null}
      </View>
    );
  }
}
