import React from "react";
import { SafeAreaView, Platform, StatusBar } from "react-native";

const SafeView = ({ children, style, ...rest }) => (
  <SafeAreaView
    style={{
      ...style,
      flex: 1,
      paddingTop: Platform.select({
        android: StatusBar.currentHeight,
        ios: 0
      })
    }}
    {...rest}
  >
    {children}
  </SafeAreaView>
);

export default SafeView;
