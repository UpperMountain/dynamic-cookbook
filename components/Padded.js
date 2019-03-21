import React from "react";
import { View } from "react-native";
import { padding as padSize } from "../lib/theme";

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
}) => {
  if (all) {
    horizontal = true;
    vertical = true;
  }
  const _top = (top || vertical) * padSize;
  const _bottom = (bottom || vertical) * padSize;
  const _left = (left || horizontal) * padSize;
  const _right = (right || horizontal) * padSize;

  return (
    <View
      style={{
        paddingLeft: _left,
        paddingRight: _right,
        paddingTop: _top,
        paddingBottom: _bottom,
        ...style
      }}
      {...rest}
    >
      {children}
    </View>
  );
};

export default Padded;
