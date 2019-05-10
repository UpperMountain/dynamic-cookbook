import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import shadow from "../lib/shadow";
import theme from "../lib/theme";
import Timer from "./Timer";

const styles = StyleSheet.create({
  container: {
    marginLeft: "5%",
    marginRight: "5%"
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    height: 110,
    ...shadow(0.5),
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10
  }
});

interface Props {
  time: number;
  title: string;
  caption: string;
}

interface State {
  timerActive: boolean;
  timerFinished: boolean;
  done: boolean;
}

class Interaction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      timerActive: false,
      timerFinished: this.props.time ? false : true,
      done: false
    };
  }

  onTimer = () => {
    this.setState({ timerFinished: true });
  };

  icon = () => {
    let icn = null;
    if (this.props.time) {
      if (this.state.timerActive) {
        icn = <MaterialIcons name={"timer"} size={54} />;
      } else {
        icn = (
          <TouchableOpacity
            onPress={() => this.setState({ timerActive: true })}
          >
            <MaterialIcons name={"play-circle-outline"} size={54} />
          </TouchableOpacity>
        );
      }
    } else {
      icn = <MaterialIcons name={"priority-high"} size={54} />;
    }
    return <View style={{ marginRight: 10 }}>{icn}</View>;
  };

  inside = () => {
    if (!this.state.timerFinished && !this.state.done) {
      return (
        <Timer
          active={this.state.timerActive}
          seconds={this.props.time}
          onFinish={this.onTimer}
        />
      );
    }
    return (
      <Text style={{ fontSize: 36, lineHeight: 36, marginBottom: 0 }}>
        Next Step
      </Text>
    );
  };

  canMoveOn = () => {
    return (
      (this.state.timerFinished || this.state.timerActive) && !this.state.done
    );
  };

  handleClick = () => {
    if (this.canMoveOn()) {
      this.setState({ done: true });
    }
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={this.canMoveOn() ? 0.2 : 1}
        onPress={this.handleClick}
        style={styles.container}
      >
        <View style={styles.card}>
          {this.icon()}
          <View>
            <Text style={[theme.body, { letterSpacing: 2, marginBottom: 5 }]}>
              {(this.props.title || "step title").toUpperCase()}
            </Text>
            {this.inside()}
            <Text style={[theme.body, { color: "#787878" }]}>
              ({this.props.caption || "click if you're ready to move on"})
            </Text>
          </View>
          {this.state.done ? (
            <MaterialIcons
              style={{ marginLeft: "auto", paddingRight: 5 }}
              name={"check"}
              color={"#008300"}
              size={50}
            />
          ) : this.canMoveOn() ? (
            <MaterialIcons
              style={{ marginLeft: "auto" }}
              name={"chevron-right"}
              color={"#787878"}
              size={54}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
}

export default Interaction;
