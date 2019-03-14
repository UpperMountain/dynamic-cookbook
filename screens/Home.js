import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { LinearGradient } from "expo";
import SearchBar from "../components/SearchBar";
import { MealCard } from "../components/MealCard";
import { FontAwesome } from "@expo/vector-icons";
import tabIcon from "../components/tabIcon";

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searching: false
    };
  }

  static navigationOptions = {
    tabBarIcon: tabIcon("home")
  };

  render() {
    const DismissKeys = ({ children }) => (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        {children}
      </TouchableWithoutFeedback>
    );

    return (
      <DismissKeys>
        <View style={styles.container}>
          <LinearGradient
            style={styles.background}
            colors={["#FFAFBD", "#FFC3A0"]}
          >
            <SearchBar open={this.state.searching} />
          </LinearGradient>
        </View>
      </DismissKeys>
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
  }
});

export default Home;
