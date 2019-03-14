import React from "react";
import { Text } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Constants } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import Home from "./Home";
import tabIcon from "../components/tabIcon.js";
import { colorPrimary, colorShade } from "../lib/theme.js";
import Categories from "./Categories";
import MyMeal from "./MyMeal";

export const RootNavigator = createMaterialBottomTabNavigator(
  {
    Home,
    Categories,
    MyMeal
  },
  {
    order: ["Home", "Categories", "MyMeal"],
    initialRouteName: "Home",
    activeColor: "#ffc3a0",
    inactiveColor: colorShade,
    barStyle: { backgroundColor: "white" }
  }
);
