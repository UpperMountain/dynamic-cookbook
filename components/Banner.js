import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colorPrimary } from "../lib/theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 65,
    backgroundColor: "white"
  },
  text: {
    position: "absolute",
    left: 33,
    bottom: 15,
    fontFamily: "raleway-medium",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 1,
    color: colorPrimary
  }
});

export default (Banner = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
));
