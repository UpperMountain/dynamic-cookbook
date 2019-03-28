import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import theme, { padding } from "../lib/theme";
import pancakeImg from "../assets/images/pancakes.jpg";

const ImageContainer = ({ width, height, children }) => {
  const pad = width === 210 ? 4 : 0;
  return (
    <View
      style={{
        width,
        height,
        overflow: "hidden",
        borderRadius: 12,
        marginRight: padding,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {children}
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          top: height * 0.78 + pad,
          width,
          height: height * 0.22 - pad
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            width,
            height: height * 0.22 - pad,
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
    super(props);
    this.state = { loading: true };
  }

  render() {
    const { loading } = this.state;
    return (
      <View>
        <ImageContainer width={210} height={262}>
          <ActivityIndicator
            style={{ position: "absolute" }}
            animating={loading}
          />
          <Image
            onLoadEnd={() => this.setState({ loading: false })}
            style={{ width: 210, height: 262 }}
            source={pancakeImg}
          />
        </ImageContainer>
      </View>
    );
  }
}

export class SmallMealCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    const { loading } = this.state;
    return (
      <View>
        <ImageContainer width={142} height={191}>
          <ActivityIndicator
            style={{ position: "absolute" }}
            animating={loading}
          />
          <Image
            onLoadEnd={() => this.setState({ loading: false })}
            style={{ width: 142, height: 191 }}
            source={pancakeImg}
          />
        </ImageContainer>
      </View>
    );
  }
}
