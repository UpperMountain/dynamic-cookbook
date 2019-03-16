import React from "react";
import tabIcon from "../components/tabIcon.js";
import { Text } from "react-native";
import SafeView from "../components/SafeView";

const MyMeal = () => (
  <SafeView>
    <Text>MyMeal</Text>
  </SafeView>
);

MyMeal.navigationOptions = {
  title: "My Meal",
  tabBarIcon: tabIcon("book")
};

export default MyMeal;
