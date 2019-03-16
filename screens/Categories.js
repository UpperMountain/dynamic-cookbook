import React from "react";
import tabIcon from "../components/tabIcon.js";
import { Text } from "react-native";
import SafeView from "../components/SafeView.js";

const Categories = () => (
  <SafeView>
    <Text>Categories</Text>
  </SafeView>
);

Categories.navigationOptions = {
  title: "Categories",
  tabBarIcon: tabIcon("th")
};

export default Categories;
