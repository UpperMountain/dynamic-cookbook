import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch"
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  rightCol: { flex: 1 },
  fillLine: {
    borderLeftColor: "black",
    borderLeftWidth: 1,
    flex: 1
  }
});

interface Props {
  // Container style.
  // Useful to pass 'height' for blank line
  style?: ViewProps["style"];

  // Style of inner view
  innerStyle?: ViewProps["style"];

  // Space between left edge of component and inner contents
  sideWidth?: number;

  // Inner contents
  children?: React.ReactNode;

  // Aside contents, above the line
  aside?: React.ReactNode;

  // Don't offset the left edge of the contents
  overlap?: boolean;

  // If true, don't show the line.
  hidden?: boolean;
}

export default function LeftLine(props: Props) {
  const {
    style,
    innerStyle,
    overlap = false,
    children,
    aside,
    sideWidth = 75,
    hidden
  } = props;
  return (
    <View style={[styles.container, style]}>
      <View style={[{ width: sideWidth }, styles.leftCol]}>
        {aside}
        {!hidden && <View style={styles.fillLine} />}
      </View>
      <View
        style={[
          { marginLeft: overlap ? -sideWidth : 0 },
          styles.rightCol,
          innerStyle
        ]}
      >
        {children}
      </View>
    </View>
  );
}
