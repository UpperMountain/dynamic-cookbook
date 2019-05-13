import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import shadow from "../lib/shadow";
import Timer from "./Timer";
import { OnGoingTimer } from "../lib/dependencyTree";

const styles = StyleSheet.create({
  container: {
    marginLeft: "4%",
    marginRight: "4%"
  },
  cardInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "100%",
    paddingTop: 18,
    paddingBottom: 18
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
  onTick: (id: number) => void;
  timer: OnGoingTimer | null;
  title: string;
  body: string;
  caption: string | null;
  done: boolean;
  number: number;
  onComplete: (num: number) => void;
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
      timerFinished: this.props.timer ? false : true,
      done: this.props.done
    };
  }

  onTimer = () => {
    this.setState({ timerFinished: true });
  };

  icon = () => {
    let icn = null;
    if (this.props.timer) {
      if (this.state.timerActive) {
        icn = <MaterialIcons name={"timer"} size={54} />;
      } else {
        icn = <MaterialIcons name={"play-circle-outline"} size={54} />;
      }
    } else {
      icn = <MaterialIcons name={"priority-high"} size={54} />;
    }
    return <View style={{ marginRight: 10 }}>{icn}</View>;
  };

  inside = () => {
    if (!this.state.timerFinished && !this.state.done && this.props.timer) {
      return (
        <Timer
          onTick={this.props.onTick}
          id={this.props.number}
          active={this.state.timerActive}
          timer={this.props.timer}
          onFinish={this.onTimer}
        />
      );
    }
    return (
      <Text style={{ fontSize: 24, lineHeight: 24, marginBottom: 0 }}>
        {this.props.body || "Next Step"}
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
    } else {
      this.setState({ timerActive: true });
    }
    this.props.onComplete(this.props.number);
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={!this.state.done ? 0.2 : 1}
        onPress={!this.state.done ? this.handleClick : () => {}}
        style={styles.container}
      >
        <View style={styles.card}>
          {this.icon()}
          <View style={styles.cardInner}>
            <Text style={{ letterSpacing: 2 }}>
              {(this.props.title || "step title").toUpperCase()}
            </Text>
            {this.inside()}
            <Text style={{ color: "#787878" }}>
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
