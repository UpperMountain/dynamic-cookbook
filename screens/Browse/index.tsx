import { createStackNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import tabIcon from "../../components/tabIcon";
import { colorShade, colorPrimary } from "../../lib/theme";
import createBrowseNavigator from "./BrowseNavigator";

import Feed from "./Feed";
import Search from "./Search";
import RecipeView from "./RecipeView";

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      header: null
    }
  },
  RecipeView: {
    screen: RecipeView,
    navigationOptions: {
      title: "Recipe"
    }
  }
});

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: { header: null }
  },
  // different name to disambiguate
  RecipeView: {
    screen: RecipeView,
    navigationOptions: {
      title: "Recipe"
    }
  }
});

const Base = createMaterialBottomTabNavigator(
  {
    Feed: {
      screen: FeedStack,
      navigationOptions: {
        title: "Feed",
        // tabBarIcon: tabIcon("collections")
        tabBarIcon: tabIcon("dashboard")
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        title: "Search",
        tabBarIcon: tabIcon("search")
      }
    }
  },
  {
    order: ["Feed", "Search"],
    initialRouteName: "Feed",
    activeTintColor: colorPrimary,
    inactiveTintColor: colorShade,
    barStyle: { backgroundColor: "white" },
    shifting: false,
    labeled: false
  }
);

export default createBrowseNavigator(Base);
