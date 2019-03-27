import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
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
        borderRadius: 12,
        marginRight: padding,
        alignItems: "center",
        justifyContent: "center"
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
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            width: props.width,
            height: props.height * 0.22 - pad,
            paddingLeft: 16,
            paddingTop: 4 + pad
          }}
        >
          <Text style={[theme.body, { marginBottom: pad }]}>Pancakes</Text>
          <Text style={theme.caption}>20min | serves 4</Text>
        </View>
      </View>
    </View>
  );
};

export class MealCard extends React.Component {
  constructor(props) {
    super();
    this.state = { loading: true };
  }

  render() {
    return (
      <View>
        <ImageContainer width={210} height={262}>
          <ActivityIndicator
            style={{ position: "absolute" }}
            animating={this.state.loading}
          />
          <Image
            onLoadEnd={() => this.setState({ loading: false })}
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
    this.state = { loading: true };
  }

  render() {
    return (
      <View>
        <ImageContainer width={142} height={191}>
          <ActivityIndicator
            style={{ position: "absolute" }}
            animating={this.state.loading}
          />
          <Image
            onLoadEnd={() => this.setState({ loading: false })}
            style={{ width: 142, height: 191 }}
            source={require("../assets/images/pancakes.jpg")}
          />
        </ImageContainer>
      </View>
    );
  }
}
