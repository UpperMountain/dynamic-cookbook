import React from "react";
import { View, ViewProps } from "react-native";
import Padded from "./Padded";
import shadow from "../lib/shadow";

export interface Props {
  children: React.ReactNode;

  // passed to shadow()
  shadowAmt?: number;

  // Container View style overrides
  style?: ViewProps["style"];

  // Inner view style overrides
  innerStyle?: ViewProps["style"];
}

export default function Card(props: Props) {
  const { children, shadowAmt = 0.1, style, innerStyle } = props;
  return (
    <Padded bottom style={style}>
      <View
        style={[
          {
            backgroundColor: "white",
            ...shadow(shadowAmt)
          },
          innerStyle
        ]}
      >
        {children}
      </View>
    </Padded>
  );
}
