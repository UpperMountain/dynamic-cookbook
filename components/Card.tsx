import React from "react";
import { View, StyleSheet } from "react-native";
import Padded from "./Padded";
import shadow from "../lib/shadow";

export interface Props {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  card: { backgroundColor: "white", ...shadow(0.1) }
});

export default function Card(props: Props) {
  const { children } = props;
  return (
    <Padded bottom>
      <View style={styles.card}>{children}</View>
    </Padded>
  );
}
