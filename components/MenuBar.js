import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
var s = require("./Styles");

class MenuBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      current: 0
    };
  }
  render() {
    const Icon = props => {
      let currentColor =
        props.pos == this.state.current ? "#ffc3a0" : "#757575";
      return (
        <TouchableOpacity
          style={{ alignItems: "center", marginTop: 5 }}
          onPress={() => this.setState({ current: props.pos })}
        >
          <FontAwesome name={props.name} size={26} color={currentColor} />
          <Text style={{ color: currentColor }}>{props.text}</Text>
        </TouchableOpacity>
      );
    };

    const styles = StyleSheet.create({
      bar: {
        position: "absolute",
        bottom: 0,
        borderTopColor: "rgba(108, 123, 138, .24)",
        borderTopWidth: 1,
        width: "100%",
        height: 74,
        backgroundColor: "#fff",
        flexDirection: "row"
      }
    });

    return (
      <View style={[styles.bar, s.shadow]}>
        <Icon pos={0} name={"home"} text={"Home"} />
        <Icon pos={1} name={"th"} text={"Categories"} />
        <Icon pos={2} name={"book"} text={"My Meal"} />
      </View>
    );
  }
}

export default MenuBar;
