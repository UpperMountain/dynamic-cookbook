import React from "react";
import { View, Text } from "react-native";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHours: this.props.hours ? true : false,
      showMinutes: this.props.minutes || this.props.hours ? true : false,
      duration:
        this.props.seconds +
        (this.props.hours ? this.props.hours * 3600 : 0) +
        (this.props.minutes ? this.props.minutes * 60 : 0),
      finished: false
    };
    this.time = this.formatTime();
    this.timer = setInterval(this.getTimeLeft, 1000);
  }

  pad = n => {
    return n < 10 ? "0" + n : n;
  };

  getTimeLeft = () => {
    if (!this.state.finished) {
      this.setState({
        duration: this.state.duration - 1
      });
      if (this.state.duration < 0) {
        this.setState({
          finished: true
        });
        clearInterval(this.timer);
      }
    }
    this.time = this.formatTime();
  };

  formatTime = () => {
    time = "";
    if (this.state.showHours) {
      time += this.pad(Math.floor(this.state.duration / 3600)) + ":";
    }
    if (this.state.showMinutes) {
      time += this.pad(Math.floor(this.state.duration / 60) % 60) + ":";
    }
    time += this.pad(this.state.duration % 60);
    return time;
  };

  render() {
    return (
      <View>
        <Text>{this.time}</Text>
      </View>
    );
  }
}

export default Timer;
