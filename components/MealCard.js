import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { BlurView } from "expo";
import theme, { padding } from "../lib/theme";

const ImageContainer = props => {
  let pad = props.width == 210 ? 4 : 0;
  return (
    <View
      style={{
        width: props.width,
        height: props.height,
        overflow: "hidden",
        borderRadius: 19,
        marginRight: padding
      }}
    >
      {props.children}
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          top: props.height * 0.78 + pad,
          width: props.width,
          height: props.height * 0.22 - pad
        }}
      >
        <BlurView
          tint={"light"}
          intensity={65}
          style={{
            width: props.width,
            height: props.height * 0.22 - pad,
            paddingLeft: 16,
            paddingTop: 4 + pad
          }}
        >
          <Text style={[theme.body, { marginBottom: pad }]}>Pancakes</Text>
          <Text style={theme.caption}>20min | serves 4</Text>
        </BlurView>
      </View>
    </View>
  );
};

export class MealCard extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={theme.shadow}>
        <ImageContainer width={210} height={262}>
          <Image
            style={{ width: 210, height: 262 }}
            source={require("../assets/images/pancakes.jpg")}
          />
        </ImageContainer>
      </View>
    );
  }
}

export class SmallMealCard extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={theme.shadow}>
        <ImageContainer width={142} height={191}>
          <Image
            style={{ width: 142, height: 191 }}
            source={require("../assets/images/pancakes.jpg")}
          />
        </ImageContainer>
      </View>
    );
  }
}
