import React from "react";
import { View, ViewProps, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface Props {
  // Outer container style overrides
  style?: ViewProps["style"];

  // What to put inside the button
  children?: string | React.ReactNode;

  // Button height
  size?: number;

  // Constrain the button's width
  width?: number;

  // Color of the button's background
  color?: string;

  // Icon element from @expo/vector-icons, default `MaterialIcons`
  iconTag?: React.ElementType;

  // Icon name to render, null for no icon but still a circle
  iconName?: string | null;

  // Color of the icon to render
  iconColor?: string;

  // Distance from edge to icon
  iconPad?: number;

  // Press handler
  onPress?: () => void;
}

export default function Button({
  children,
  style,
  size = 35,
  width,
  iconName,
  iconTag: IconTag = MaterialIcons,
  iconColor = "gray",
  iconPad = 5,
  color = "#eaeaea",
  onPress
}: Props) {
  // Don't bother with the TouchableOpacity if you can't press the button
  const PressContainer: React.ElementType =
    typeof onPress === "undefined" ? View : TouchableOpacity;

  const hasIcon = typeof iconName !== "undefined";

  const circle = hasIcon && !children;

  const inner =
    typeof children === "string" ? (
      <Text
        style={{
          flex: 1,
          fontSize: size * 0.4,
          textAlign: hasIcon ? "left" : "center",
          paddingLeft: hasIcon ? iconPad : 0
        }}
      >
        {children}
      </Text>
    ) : (
      children
    );

  return (
    <PressContainer
      style={[
        {
          backgroundColor: color,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: size,
          width: circle ? size : width,
          paddingLeft: iconPad,
          paddingRight: iconPad,
          borderRadius: size / 2
        },
        style
      ]}
      onPress={onPress}
    >
      {iconName != null && (
        <IconTag name={iconName} size={size - iconPad * 2} color={iconColor} />
      )}
      {inner}
    </PressContainer>
  );
}
