import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { LinearGradient } from "expo";
import SearchBar from "../components/SearchBar";
import SafeView from "../components/SafeView";
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
        <LinearGradient
          style={styles.container}
          colors={["#FFAFBD", "#FFC3A0"]}
        >
          <SafeView>
            <SearchBar open={this.state.searching} />
          </SafeView>
        </LinearGradient>
      </DismissKeys>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex"
  },
  background: {
    flex: 1,
    display: "flex"
  }
});

export default Home;
