import { createStackNavigator } from "react-navigation";

import Browse from "./Browse";
import Meal from "./Meal";
import Debug from "./Debug";

export const RootNavigator = createStackNavigator(
  {
    Browse: { screen: Browse, navigationOptions: { header: null } },
    Meal: { screen: Meal, navigationOptions: { title: "Meal" } },
    Debug: { screen: Debug, navigationOptions: { title: "Debug" } }
  },
  { initialRouteName: "Browse" }
);
