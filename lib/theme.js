import React from "react";
import { StyleSheet } from "react-native";

export const colorPrimary = "#ffc3a0";
export const colorShade = "#757575";

// horizontal/vertical padding
// e.g. between text and the edge of the screen
export const padding = 20;

export default StyleSheet.create({
  header: {
    fontFamily: "raleway-medium",
    fontSize: 24
  },
  body: {
    fontFamily: "raleway",
    fontSize: 14
  },
  caption: {
    fontFamily: "raleway",
    fontSize: 12,
    color: "rgba(0, 0, 0, .65)",
    letterSpacing: 0.5
  },
  label: {
    fontFamily: "raleway",
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    // NOTE: <View/> must have solid background for elevation to work
    elevation: 8
  }
});
