import React from "react";
import { View, ViewProps } from "react-native";
import { padding as padSize } from "../lib/theme";

type Measure = boolean | number;
interface Props extends ViewProps {
  children: React.ReactNode;
  all?: Measure;
  vertical?: Measure;
  horizontal?: Measure;
  left?: Measure;
  right?: Measure;
  top?: Measure;
  bottom?: Measure;
  style?: ViewProps["style"];
}

const Padded = ({
  children,
  all,
  vertical,
  horizontal,
  left,
  right,
  top,
  bottom,
  style,
  ...rest
}: Props) => {
  let _horizontal = horizontal;
  let _vertical = vertical;
  if (all) {
    _horizontal = true;
    _vertical = true;
  }
  const _top = Number(top || _vertical || 0) * padSize;
  const _bottom = Number(bottom || _vertical || 0) * padSize;
  const _left = Number(left || _horizontal || 0) * padSize;
  const _right = Number(right || _horizontal || 0) * padSize;

  return (
    <View
      style={[
        {
          paddingLeft: _left,
          paddingRight: _right,
          paddingTop: _top,
          paddingBottom: _bottom
        },
        style
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default Padded;
