import React from "react";
import { View } from "react-native";
import Padded from "./Padded";
import shadow from "../lib/shadow";

export interface Props {
  children: React.ReactNode;

  // passed to shadow()
  shadowAmt?: number;
}

export default function Card(props: Props) {
  const { children, shadowAmt = 0.1 } = props;
  return (
    <Padded bottom>
      <View
        style={{
          backgroundColor: "white",
          ...shadow(shadowAmt)
        }}
      >
        {children}
      </View>
    </Padded>
  );
}
