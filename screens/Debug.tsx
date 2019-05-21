import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

function crash() {
  throw new Error("Crash test for Sentry");
}

// Load vars outside of JSX so they're picked up by the babel plugin
// Note: this file is cached in the build, so it must be changed
// to see updated env vars.
const env = {
  NODE_ENV: process.env.NODE_ENV,
  commit: process.env.COOKIE_BUILD_COMMIT,
  commitMessage: process.env.COOKIE_BUILD_COMMIT_MESSAGE,
  buildJobNumber: process.env.COOKIE_BUILD_JOB_NUMBER,
  nodeVersion: process.env.COOKIE_BUILD_NODE_VERSION
};

// Display something
function Info({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Text
        style={{
          width: 100,
          color: "gray",
          textAlign: "right",
          marginRight: 10
        }}
      >
        {name}
      </Text>
      <Text style={{ flex: 1 }}>{children}</Text>
    </View>
  );
}

export default function Debug() {
  return (
    <View style={{ padding: 30 }}>
      <Info name="NODE_ENV">{env.NODE_ENV}</Info>
      <Info name="Node Version">{env.nodeVersion}</Info>
      <Info name="Commit">{env.commit}</Info>
      <Info name="Commit Message">{env.commitMessage}</Info>
      <Info name="Job Number">{env.buildJobNumber}</Info>
      <TouchableOpacity onPress={() => crash()}>
        <Text>Crash the app (sentry test)</Text>
      </TouchableOpacity>
    </View>
  );
}
