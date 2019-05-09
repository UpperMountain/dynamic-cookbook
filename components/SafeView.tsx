import React from "react";
import { ViewProps } from "react-native";
import { SafeAreaView, Platform, StatusBar } from "react-native";

interface Props extends ViewProps {
  children: React.ReactNode;
  style?: ViewProps["style"];
}

const SafeView = ({ children, style, ...rest }: Props) => (
  <SafeAreaView
    style={[
      {
        flex: 1,
        paddingTop: Platform.select({
          android: StatusBar.currentHeight,
          ios: 0
        })
      },
      style
    ]}
    {...rest}
  >
    {children}
  </SafeAreaView>
);

export default SafeView;
