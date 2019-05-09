import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import tabIcon from "../../components/tabIcon";
import { colorShade } from "../../lib/theme";

import Feed from "./Feed";
import Search from "./Search";

const Browse = createMaterialBottomTabNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions: {
        title: "Feed",
        tabBarIcon: tabIcon("clone")
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        title: "Search",
        tabBarIcon: tabIcon("search")
      }
    }
  },
  {
    order: ["Feed", "Search"],
    initialRouteName: "Feed",
    activeTintColor: "#ffc3a0",
    inactiveTintColor: colorShade,
    barStyle: { backgroundColor: "white" }
  }
);

export default Browse;
