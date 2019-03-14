import React from "react";
import tabIcon from "../components/tabIcon.js";
import { Text } from "react-native";

const MyMeal = () => <Text>MyMeal</Text>;
MyMeal.navigationOptions = {
  title: "My Meal",
  tabBarIcon: tabIcon("book")
};

export default MyMeal;
