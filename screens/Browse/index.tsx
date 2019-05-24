import { createStackNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import tabIcon, { communityTabIcon } from "../../components/tabIcon";
import { colorShade, colorPrimary } from "../../lib/theme";
import createBrowseNavigator from "./BrowseNavigator";

import Feed from "./Feed";
import Search from "./Search";
import RecipeView from "./RecipeView";
import Plan from "./Plan";

const RecipePage = {
  RecipeView: {
    screen: RecipeView,
    navigationOptions: {
      title: "Recipe"
    }
  }
};

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      header: null
    }
  },
  ...RecipePage
});

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: { header: null }
  },
  ...RecipePage
});

const PlanStack = createStackNavigator({
  Plan: { screen: Plan, navigationOptions: { title: "Meal Plan" } },
  ...RecipePage
});

const Base = createMaterialBottomTabNavigator(
  {
    Feed: {
      screen: FeedStack,
      navigationOptions: {
        title: "Feed",
        tabBarIcon: tabIcon("collections-bookmark")
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        title: "Search",
        tabBarIcon: tabIcon("search")
      }
    },
    Plan: {
      screen: PlanStack,
      navigationOptions: {
        title: "Meal Plan",
        tabBarIcon: communityTabIcon("clipboard-text-outline")
      }
    }
  },
  {
    order: ["Feed", "Search", "Plan"],
    initialRouteName: "Feed",
    activeTintColor: colorPrimary,
    inactiveTintColor: colorShade,
    barStyle: { backgroundColor: "white" },
    shifting: false,
    labeled: false
  }
);

export default createBrowseNavigator(Base);
