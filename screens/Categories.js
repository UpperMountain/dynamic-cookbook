import React from "react";
import { Text, View, Slider } from "react-native";
import tabIcon from "../components/tabIcon";
import SafeView from "../components/SafeView";
import shadow from "../lib/shadow";

class Categories extends React.Component {
  static navigationOptions = {
    title: "Categories",
    tabBarIcon: tabIcon("th")
  };

  state = {
    amt: 0
  };

  render() {
    const { amt } = this.state;
    return (
      <SafeView style={{ margin: 50 }}>
        <Text>Shadow Sandbox</Text>
        <View
          style={{
            ...shadow(amt),
            width: 100,
            height: 100,
            borderRadius: 10,
            backgroundColor: "white",
            margin: 20
          }}
        />
        <Text>{amt}</Text>
        <Slider
          min={0}
          max={1}
          value={amt}
          onValueChange={e => this.setState({ amt: e })}
        />
      </SafeView>
    );
  }
}

export default Categories;
