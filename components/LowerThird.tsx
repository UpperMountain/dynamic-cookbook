import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo";
import { padding } from "../lib/theme";

export interface Props {
  children: React.ReactNode;
  third?: React.ReactNode;
}

export default function LowerThird({ children, third = null }: Props) {
  return (
    <View style={{ flex: 1 }}>
      {children}
      {third !== null && (
        <LinearGradient
          colors={[0, 0.5, 1].map((e: number) => `rgba(255,255,255,${e})`)}
          locations={[0, 0.2, 0.8]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingTop: 1 * padding
          }}
        >
          {third}
        </LinearGradient>
      )}
    </View>
  );
}
