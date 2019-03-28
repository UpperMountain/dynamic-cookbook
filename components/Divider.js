import React from "react";
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  outer: {
    width: "100%",
    paddingLeft: "20%",
    paddingRight: "20%",
    flexDirection: "row",
    alignItems: "center"
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#fff"
  },
  text: {
    textAlign: "center",
    flex: 0.3,
    color: "#fff"
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});

export const HR = ({ text }) => {
  return (
    <View style={styles.outer}>
      <View style={[styles.line]} />
      <Text style={styles.text}>{text}</Text>
      <View style={[styles.line]} />
    </View>
  );
};

export const SpacedView = ({ height, children }) => {
  return <View style={[{ height }, styles.container]}>{children}</View>;
};
