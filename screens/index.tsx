import { createStackNavigator } from "react-navigation";

import Browse from "./Browse";
import Meal from "./Meal";

export const RootNavigator = createStackNavigator(
  {
    Browse: { screen: Browse, navigationOptions: { header: null } },
    Meal: { screen: Meal, navigationOptions: { title: "Meal" } }
  },
  { initialRouteName: "Browse" }
);
