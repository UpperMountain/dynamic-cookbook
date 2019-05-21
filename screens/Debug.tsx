import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

function crash() {
  throw new Error("Crash test for Sentry");
}

export default function Debug() {
  return (
    <View style={{ padding: 30 }}>
      <TouchableOpacity onPress={() => crash()}>
        <Text>Crash the app (sentry test)</Text>
      </TouchableOpacity>
    </View>
  );
}
