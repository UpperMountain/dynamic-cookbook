import React from "react";
import { Text } from "react-native";
import tabIcon from "../components/tabIcon";
import SafeView from "../components/SafeView";

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
