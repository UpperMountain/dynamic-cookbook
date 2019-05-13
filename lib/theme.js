import { Platform, StyleSheet } from "react-native";

export const colorPrimary = "#ffc3a0";
export const colorShade = "#757575";

// horizontal/vertical padding
// e.g. between text and the edge of the screen
export const padding = Platform.select({
  android: 20,
  ios: 20
});

export default StyleSheet.create({
  header: {
    fontSize: 24
  },
  body: {
    fontSize: 14
  },
  caption: {
    fontSize: 12,
    color: "rgba(0, 0, 0, .65)",
    letterSpacing: 0.5
  },
  label: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    letterSpacing: 1
  }
});
