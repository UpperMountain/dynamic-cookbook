import { createStackNavigator } from "react-navigation-stack";

import MyMeal from "./MyMeal";

const Meal = createStackNavigator(
  {
    MyMeal
  },
  { headerMode: "none" }
);

export default Meal;
