import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle
} from "react-native";
import { LinearGradient } from "expo";

interface CustomStyle {
  background?: ViewStyle["backgroundColor"];
  borderColor?: ViewStyle["borderColor"];
  textColor?: TextStyle["color"];
}
const styles = (
  { background, borderColor, textColor }: CustomStyle,
  width: number,
  size: number
) =>
  StyleSheet.create({
    button: {
      width,
      height: 56,
      backgroundColor: background || "white",
      borderColor: borderColor || "black",
      borderWidth: 3,
      borderRadius: 72,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    text: {
      fontSize: size,
      color: textColor || "black",
      lineHeight: 32,
      fontFamily: "raleway-bold",
      flexDirection: "row"
    }
  });

interface Props {
  width?: number;
  size?: number;
  style?: CustomStyle;
  clear?: boolean;
  gradient?: boolean;
  text: string;
  onPress: () => void;
}

const RoundedButton = ({
  width,
  size,
  style,
  clear,
  gradient,
  text,
  onPress
}: Props) => {
  let currentStyle = null;
  if (clear) {
    currentStyle = styles(
      {
        background: "transparent",
        textColor: "white",
        borderColor: "white"
      },
      width || 315,
      size || 18
    );
  } else if (gradient) {
    currentStyle = styles(
      {
        background: "transparent",
        textColor: "white",
        borderColor: "transparent"
      },
      width || 315,
      size || 18
    );
  } else {
    currentStyle = styles(style || {}, width || 315, size || 18);
  }

  const buttonText = <Text style={currentStyle.text}>{text}</Text>;
  let outerButton = null;

  if (gradient) {
    outerButton = (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          style={currentStyle.button}
          colors={["#FFAFBD", "#FFC3A0"]}
        >
          {buttonText}
        </LinearGradient>
      </TouchableOpacity>
    );
  } else {
    outerButton = (
      <TouchableOpacity style={currentStyle.button} onPress={onPress}>
        {buttonText}
      </TouchableOpacity>
    );
  }
  return <View>{outerButton}</View>;
};

export default RoundedButton;
