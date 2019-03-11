import React from "react";
import { Font } from "expo";
import { View } from "react-native";
import LoginPage from "./views/Login";
<<<<<<< HEAD
=======
import Home from "./views/Home";
>>>>>>> general progress

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
<<<<<<< HEAD
      "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
      FontAwesome5FreeSolid: require("./assets/fonts/fontawesome-webfont.ttf")
=======
      "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf")
>>>>>>> general progress
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
<<<<<<< HEAD
        {this.state.fontLoaded ? <LoginPage /> : null}
=======
        {this.state.fontLoaded ? <Home /> : null}
>>>>>>> general progress
      </View>
    );
  }
}
