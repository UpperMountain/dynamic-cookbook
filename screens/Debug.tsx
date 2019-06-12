import React from "react";
import { AsyncStorage, ScrollView, View, Text, Platform } from "react-native";
import ButtonInner, { Props as ButtonProps } from "../components/Button";
import { Updates, Constants, Segment } from "expo";

function crash() {
  throw new Error("Crash test for Sentry");
}

// Load vars outside of JSX so they're picked up by the babel plugin
// Note: this file is cached in the build, so it must be changed
// to see updated env vars.
const env = {
  commit: process.env.COOKIE_BUILD_COMMIT,
  tag: process.env.COOOKIE_BUILD_TAG,
  commitMessage: process.env.COOKIE_BUILD_COMMIT_MESSAGE,
  buildJobNumber: process.env.COOKIE_BUILD_JOB_NUMBER,
  nodeVersion: process.env.COOKIE_BUILD_NODE_VERSION
};

// Display something
function Info({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <View
      style={{
        margin: 10,
        marginTop: 0,
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
          marginRight: 10,
          fontSize: 11
        }}
      >
        {name}
      </Text>
      <Text style={{ flex: 1, fontSize: 11 }}>{children}</Text>
    </View>
  );
}

function Button(props: ButtonProps) {
  return (
    <View style={{ margin: 10 }}>
      <ButtonInner {...props} />
    </View>
  );
}

function Header({ children }: { children: string }) {
  return (
    <Text style={{ margin: 20, marginTop: 30, fontSize: 20 }}>{children}</Text>
  );
}

export default function Debug() {
  return (
    <ScrollView
      style={{ padding: 10 }}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Header>Diagnostics</Header>
      <Button iconName="error" onPress={() => crash()}>
        Crash the app (sentry reporting test)
      </Button>
      <Button iconName="system-update" onPress={() => Updates.reload()}>
        Force OTA update to latest
      </Button>
      <Button iconName="delete-sweep" onPress={() => AsyncStorage.clear()}>
        Clear AsyncStorage
      </Button>
      <Button iconName="cancel" onPress={() => Segment.setEnabledAsync(false)}>
        Disable Segment tracking
      </Button>
      <Button
        iconName="network-check"
        onPress={() => Segment.setEnabledAsync(true)}
      >
        Enable Segment tracking
      </Button>
      <Header>Build information</Header>
      <Info name="Version Tag">{env.tag}</Info>
      <Info name="Commit">{env.commit}</Info>
      <Info name="Commit Message">{env.commitMessage}</Info>
      <Info name="Job Number">{env.buildJobNumber}</Info>
      <Info name="Node Version">{env.nodeVersion}</Info>
      <Header>Constants</Header>
      <Info name="Expo Version">{Constants.expoVersion}</Info>
      <Info name="App Ownership">{Constants.appOwnership}</Info>
      <Info name="Installation ID">{Constants.installationId}</Info>
      <Info name="Session ID">{Constants.sessionId}</Info>
      <Info name="Year Class">{Constants.deviceYearClass}</Info>
      <Header>Platform</Header>
      {Platform.select({
        /* eslint-disable react/display-name */
        ios: () => (
          <>
            <Info name="Platform">iOS</Info>
            <Info name="Version">{Platform.Version}</Info>
            <Info name="Model">{Constants.platform.ios!.model}</Info>
            <Info name="Internal ID">{Constants.platform.ios!.platform}</Info>
          </>
        ),
        android: () => (
          <>
            <Info name="Platform">Android</Info>
            <Info name="Version">{Platform.Version}</Info>
            <Info name="Version Code">
              {Constants.platform.android!.versionCode}
            </Info>
          </>
        )
        /* eslint-enable */
      })()}
    </ScrollView>
  );
}
