import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { BlurView } from "expo";
var s = require("./Styles");

const ImageContainer = props => {
  let pad = props.width == 210 ? 4 : 0;
  return (
    <View
      style={{
        width: props.width,
        height: props.height,
        overflow: "hidden",
        backgroundColor: "white",
        borderRadius: 19
      }}
    >
      {props.children}
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          top: props.height * 0.78 + pad,
          width: props.width,
          height: props.height * 0.22 - pad,
          backgroundColor: "rgba(255, 255, 255, .6)"
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
          <Text style={[s.body, { marginBottom: pad }]}>Pancakes</Text>
          <Text style={s.caption}>20min | serves 4</Text>
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
<<<<<<< HEAD
      <View style={style.shadow}>
=======
      <View style={s.shadow}>
>>>>>>> general progress
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
<<<<<<< HEAD
      <View style={style.shadow}>
=======
      <View style={s.shadow}>
>>>>>>> general progress
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
