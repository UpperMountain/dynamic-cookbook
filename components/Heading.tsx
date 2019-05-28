import React from "react";
import { Text, TextProps } from "react-native";

const sizes = {
  1: 22,
  2: 17
};

export interface Props {
  children: string | React.ReactNode;

  // style overrides
  style?: TextProps["style"];
}

export function Heading1({ children, style }: Props) {
  return <Text style={[{ fontSize: sizes[1] }, style]}>{children}</Text>;
}

export function Heading2({ children, style }: Props) {
  return <Text style={[{ fontSize: sizes[2] }, style]}>{children}</Text>;
}

export default Heading1;
