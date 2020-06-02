import React from "react";
import { ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props extends ViewProps {
  children: React.ReactNode;
  style?: ViewProps["style"];
}

const SafeView = ({ children, style, ...rest }: Props) => (
  <SafeAreaView
    style={[
      {
        flex: 1
      },
      style
    ]}
    {...rest}
  >
    {children}
  </SafeAreaView>
);

export default SafeView;
