import React from "react";
import { LinearGradient } from "expo";
import { View, StyleSheet, Image } from "react-native";
import RoundedButton from "../components/RoundedButton";
import { HR, SpacedView } from "../components/Divider";

class LoginPage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.background}
          colors={["#FFAFBD", "#FFC3A0"]}
        >
          <SpacedView height={"50%"}>
            <Image
              style={styles.logo}
              source={require("../assets/images/CookieLogo.png")}
            />
          </SpacedView>

          <SpacedView height={"40%"}>
            <RoundedButton clear text={"Login"} />
            <RoundedButton
              style={{
                backgroundColor: "white",
                textColor: "#FFC3A0",
                borderColor: "white"
              }}
              text={"Register"}
            />

            <HR text={"or"} />

            <RoundedButton
              style={{
                background: "#DB4437",
                textColor: "#fff",
                borderColor: "#DB4437"
              }}
              text={"Sign in With Google"}
            />

            <RoundedButton
              style={{
                background: "#3C5A99",
                textColor: "#fff",
                borderColor: "#3C5A99"
              }}
              text={"Continue With Facebook"}
            />
          </SpacedView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  background: {
    flex: 1,
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200
  }
});

export default LoginPage;
