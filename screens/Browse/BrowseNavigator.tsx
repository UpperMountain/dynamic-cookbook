import React from "react";
import {
  Platform,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationInjectedProps, NavigationContainer } from "react-navigation";
import shadow from "../../lib/shadow";
import { colorShade, colorPrimary } from "../../lib/theme";
import { RecipeSpec } from "../../lib/Recipe";

// adapted from https://github.com/wix/react-native-navigation/issues/1633#issuecomment-379337969
function getNavbarHeight() {
  if (Platform.OS == "ios") {
    const { height, width } = Dimensions.get("window");

    if (height === 812 || width === 812) {
      return 88; // iPhone X navbar height (regular title);
    } else {
      return 64; // iPhone navbar height
    }
  } else {
    return 54; //android portrait navbar height;
  }
}

const styles = StyleSheet.create({
  floatingBar: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: getNavbarHeight() + 20,
    height: 40,
    backgroundColor: "white",
    borderRadius: 50,
    ...shadow(0.3),

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  startButton: {
    borderRadius: 30,
    height: 30,
    marginRight: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colorPrimary,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  cancelButton: {
    height: 30,
    width: 30,
    marginLeft: 5,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

interface BrowseNavigatorState {
  recipes: { [key: string]: RecipeSpec };
}

export interface RecipesScreenProps {
  recipes: { [key: string]: RecipeSpec };
  updateRecipe: (recipe: RecipeSpec) => void;
  removeRecipe: (id: string) => void;
}

export default function createBrowseNavigator(Base: NavigationContainer) {
  return class BrowseNavigator extends React.Component<
    NavigationInjectedProps,
    BrowseNavigatorState
  > {
    static router = Base.router;

    state = {
      recipes: {}
    };

    // pass in a setState-like updater function, or just an array
    updateRecipe = (recipe: RecipeSpec) => {
      this.setState(old => ({
        recipes: { ...old.recipes, [recipe.id]: recipe }
      }));
    };

    removeRecipe = (id: string) => {
      this.setState(old => {
        const recipes = old.recipes;
        delete recipes[id];
        return { ...old, recipes };
      });
    };

    render() {
      const { navigation } = this.props;
      const { recipes } = this.state;
      const amount = Object.keys(recipes).length;

      return (
        <>
          <Base
            navigation={navigation}
            screenProps={{
              recipes,
              updateRecipe: this.updateRecipe,
              removeRecipe: this.removeRecipe
            }}
          />
          {amount > 0 && (
            <View style={styles.floatingBar}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({ recipes: {} })}
              >
                <MaterialIcons name="close" size={20} color={colorShade} />
              </TouchableOpacity>
              <Text style={{ marginLeft: 20 }}>
                {amount} recipe{amount > 1 ? "s" : ""} in your meal
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.push("Meal", { recipes })}
              >
                <Text>Start</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      );
    }
  };
}
