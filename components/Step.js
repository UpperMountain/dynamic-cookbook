import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../lib/theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 22
  },
  leadingLine: {
    height: 18,
    borderLeftWidth: 1,
    borderLeftColor: "black"
  },
  trailingLine: {
    flex: 1,
    marginBottom: 0,
    height: 10,
    borderLeftWidth: 1,
    borderLeftColor: "black"
  },
  number: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    lineHeight: 28,
    fontSize: 14,
    textAlign: "center",
    borderColor: "black",
    marginTop: 7,
    marginBottom: 7
  },
  textContainer: {
    paddingTop: 25,
    flex: 0.8
  }
});

const LineSegment = ({ number }) => {
  return (
    <View
      style={{
        alignItems: "center",
        marginRight: 20
      }}
    >
      <View style={!(number == 1) ? styles.leadingLine : { height: 18 }} />
      <Text style={styles.number}>{number}</Text>
      <View style={styles.trailingLine} />
    </View>
  );
};

class Step extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LineSegment number={this.props.number} />
        <View style={styles.textContainer}>
          <Text style={[theme.header, { marginBottom: 10 }]}>
            {this.props.title}
          </Text>
          <Text>{this.props.body}</Text>
        </View>
      </View>
    );
  }
}

export default Step;
