import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  clock: {
    fontSize: 36,
    lineHeight: 36
  }
});

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: undefined,
      time: this.props.seconds
    };
  }

  tick = () => {
    if (this.props.active) {
      this.setState({ time: this.state.time - 1 });
    }
  };

  componentDidMount() {
    this.setState({ intervalId: setInterval(this.tick, 1000) });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentDidUpdate() {
    if (this.state.time <= 0) {
      clearInterval(this.state.intervalId);
    }
  }

  pad = n => {
    return n < 10 ? "0" + n : n;
  };

  formatTime = () => {
    let out = "";
    if (this.props.seconds >= 3600) {
      let hrs = Math.floor(this.state.time / 3600) % 60;
      out += this.pad(hrs) + ":";
    }
    if (this.props.seconds >= 60) {
      let mins = Math.floor(this.state.time / 60) % 60;
      out += this.pad(mins) + ":";
    }
    let secs = this.state.time % 60;
    out += this.pad(secs);

    return out;
  };

  render() {
    return <Text style={styles.clock}>{this.formatTime()}</Text>;
  }
}

export default Timer;
