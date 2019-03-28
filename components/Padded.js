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
  let _horizontal = horizontal;
  let _vertical = vertical;
  if (all) {
    _horizontal = true;
    _vertical = true;
  }
  const _top = (top || _vertical) * padSize;
  const _bottom = (bottom || _vertical) * padSize;
  const _left = (left || _horizontal) * padSize;
  const _right = (right || _horizontal) * padSize;

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
