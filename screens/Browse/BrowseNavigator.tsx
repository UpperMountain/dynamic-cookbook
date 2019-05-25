import React from "react";
import {
  Platform,
  Dimensions,
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Button from "../../components/Button";
import { NavigationInjectedProps, NavigationContainer } from "react-navigation";
import shadow from "../../lib/shadow";
import { colorPrimary } from "../../lib/theme";
import { RecipeSpec } from "../../lib/Recipe";

const storageKey = "BrowseNavigator_recipesCache";

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
    height: 45,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "white",
    borderRadius: 50,
    ...shadow(0.3),

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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

    componentDidUpdate(
      _prevProps: NavigationInjectedProps,
      prevState: BrowseNavigatorState
    ) {
      const { recipes } = this.state;
      if (prevState.recipes !== recipes) {
        // persist recipe list to AsyncStorage
        AsyncStorage.setItem(storageKey, JSON.stringify(recipes));
      }
    }

    async componentDidMount() {
      // if available, restore recipe list from AsyncStorage
      const raw = await AsyncStorage.getItem(storageKey);
      if (raw !== null) {
        const restored = JSON.parse(raw);
        console.log("restored recipes:", restored);
        this.setState({ recipes: restored });
      }
    }

    // pass in a setState-like updater function, or just an array
    updateRecipe = (recipe: RecipeSpec) => {
      this.setState(old => ({
        recipes: { ...old.recipes, [recipe.id]: recipe }
      }));
    };

    removeRecipe = (id: string) => {
      this.setState(old => {
        const recipes = { ...old.recipes };
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
              <Button
                iconName="close"
                onPress={() => this.setState({ recipes: {} })}
              />
              <Text style={{ marginLeft: 20 }}>
                {amount} recipe{amount > 1 ? "s" : ""} in your meal
              </Text>
              <Button
                onPress={() => navigation.push("Meal", { recipes })}
                width={100}
                color={colorPrimary}
              >
                Start
              </Button>
            </View>
          )}
        </>
      );
    }
  };
}
