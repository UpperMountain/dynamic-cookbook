import React from "react";
import tabIcon from "../components/tabIcon.js";
import { Text } from "react-native";

const Categories = () => <Text>Categories</Text>;
Categories.navigationOptions = {
  title: "Categories",
  tabBarIcon: tabIcon("th")
};

export default Categories;
