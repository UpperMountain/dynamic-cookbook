import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../lib/theme";
import Interaction from "./Interaction";

const styles = StyleSheet.create({
  container: {
    marginTop: 7
  },
  directions: {
    flexDirection: "row",
    marginLeft: 20
  },
  textContainer: {
    flex: 0.8
  },
  contentContainer: {
    flexDirection: "column"
  },
  trailingLine: {
    width: 0,
    height: 18,
    borderLeftWidth: 1
  },
  mainLine: {
    width: 0,
    flex: 1,
    height: 10,
    borderLeftWidth: 1
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 7
  },
  number: {
    lineHeight: 28,
    fontSize: 14,
    textAlign: "center"
  },
  activated: {
    backgroundColor: "#008300",
    borderColor: "#008300",
    borderLeftWidth: 2
  }
});

const LineSegment = ({ number, active }) => {
  let activeStyle = active ? styles.activated : null;
  return (
    <View
      style={{
        alignItems: "center",
        marginRight: 20
      }}
    >
      <View style={[styles.numberContainer, activeStyle]}>
        <Text style={[styles.number, { color: active ? "white" : "black" }]}>
          {number}
        </Text>
      </View>
      <View style={[styles.mainLine, activeStyle]} />
    </View>
  );
};

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
  }

  handleCompletion = () => {
    this.setState({ done: true });
  };

  render() {
    let activeStyle = this.state.done ? styles.activated : null;
    return (
      <View style={styles.container}>
        <View style={styles.directions}>
          <LineSegment number={this.props.number} active={this.state.done} />
          <View style={styles.textContainer}>
            <Text style={[theme.header, { marginBottom: 10 }]}>
              {this.props.title}
            </Text>
            <Text style={{ marginBottom: 10 }}>{this.props.body}</Text>
          </View>
        </View>
        <View>
          {this.props.interactive && (
            <Interaction time={65} onComplete={this.handleCompletion} />
          )}
          <View
            style={[
              styles.trailingLine,
              activeStyle,
              { marginLeft: this.state.done ? 34 : 34.5 }
            ]}
          />
        </View>
      </View>
    );
  }
}

export default Step;
