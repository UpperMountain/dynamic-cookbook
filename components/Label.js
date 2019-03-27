import React from "react";
import { Text } from "react-native";
import Padded from "./Padded";
import theme from "../lib/theme";

export const Label = ({ children, light, dark }) => {
  const color = light ? "white" : dark ? "black" : "black";
  return (
    <Padded bottom={2 / 3} top={4 / 3}>
      <Text style={[theme.label, { color }]}>{children.toUpperCase()}</Text>
    </Padded>
  );
};

export const Section = ({ children, light }) => (
  <Padded horizontal>
    <Label light={light}>{children}</Label>
  </Padded>
);
