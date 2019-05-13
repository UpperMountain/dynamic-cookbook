import React from "react";
import { Text, StyleSheet } from "react-native";
import { OnGoingTimer } from "../lib/dependencyTree";

const styles = StyleSheet.create({
  clock: {
    fontSize: 24,
    lineHeight: 24
  }
});

interface Props {
  onTick: (id: number) => void;
  id: number;
  timer: OnGoingTimer;
  active: boolean;
  onFinish: () => void;
}

interface State {
  intervalId: NodeJS.Timeout | undefined;
}

class Timer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      intervalId: undefined
    };
  }

  tick = () => {
    if (this.props.active) {
      this.props.onTick(this.props.id);
    }
  };

  componentDidMount() {
    this.setState({ intervalId: setInterval(this.tick, 1000) });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId as NodeJS.Timeout);
  }

  componentDidUpdate() {
    if (this.props.timer.elapsed >= this.props.timer.duration) {
      clearInterval(this.state.intervalId as NodeJS.Timeout);
      this.props.onFinish ? this.props.onFinish() : null;
    }
  }

  pad = (n: number) => {
    return n < 10 ? "0" + n : n;
  };

  formatTime = (preTimer: boolean) => {
    let left = this.props.timer.duration - this.props.timer.elapsed;
    let out = "";
    if (this.props.timer.duration >= 3600) {
      let hrs = Math.floor(left / 3600) % 60;
      if (preTimer) {
        out += hrs + "h ";
      } else {
        out += this.pad(hrs) + ":";
      }
    }
    if (this.props.timer.duration >= 60) {
      let mins = Math.floor(left / 60) % 60;
      if (preTimer) {
        if (mins > 0) {
          out += mins + "m ";
        }
      } else {
        out += this.pad(mins) + ":";
      }
    }
    let secs = left % 60;
    if (preTimer) {
      if (secs > 0) {
        out += secs + "s";
      }
    } else {
      out += this.pad(secs);
    }

    return out;
  };

  render() {
    return (
      <Text style={styles.clock}>{this.formatTime(!this.props.active)}</Text>
    );
  }
}

export default Timer;
