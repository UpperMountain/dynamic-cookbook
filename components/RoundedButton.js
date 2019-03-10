import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo";

const styles = ({ background, borderColor, textColor }, width) =>
  StyleSheet.create({
    button: {
      width: width,
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
      fontSize: 18,
      color: textColor || "black",
      lineHeight: 32,
      fontFamily: "raleway-bold",
      flexDirection: "row"
    }
  });

const RoundedButton = props => {
  let currentStyle = null;
  if (props.clear) {
    currentStyle = styles(
      {
        background: "transparent",
        textColor: "white",
        borderColor: "white"
      },
      props.width || 315
    );
  } else if (props.gradient) {
    currentStyle = styles(
      {
        background: "transparent",
        textColor: "white",
        borderColor: "transparent"
      },
      props.width || 315
    );
  } else {
    currentStyle = styles(props.style || {}, props.width || 315);
  }

  let buttonText = <Text style={currentStyle.text}>{props.text}</Text>;
  let outerButton = null;

  if (props.gradient) {
    outerButton = (
      <TouchableOpacity onPress={props.onPress}>
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
      <TouchableOpacity style={currentStyle.button} onPress={props.onPress}>
        {buttonText}
      </TouchableOpacity>
    );
  }
  return <View>{outerButton}</View>;
};

export default RoundedButton;
