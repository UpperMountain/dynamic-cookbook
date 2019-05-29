import React from "react";
import { Platform, Dimensions, View, Text, StyleSheet } from "react-native";
import Button from "../../components/Button";
import { NavigationInjectedProps, NavigationContainer } from "react-navigation";
import shadow from "../../lib/shadow";
import { qty } from "../../lib/plural";
import { colorPrimary } from "../../lib/theme";
import { MealContext, MealContextConsumer } from "../../lib/mealContext";

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

export default function createBrowseNavigator(Base: NavigationContainer) {
  function BrowseNavigator({ navigation }: NavigationInjectedProps) {
    return (
      <MealContextConsumer>
        {({ recipes, reset }: MealContext) => (
          <>
            <Base navigation={navigation} />
            {Object.keys(recipes).length > 0 && (
              <View style={styles.floatingBar}>
                <Button iconName="close" onPress={() => reset()} />
                <Text style={{ marginLeft: 20 }}>
                  {qty(Object.keys(recipes).length, 1, "recipe ", "recipes ")}
                  in your meal
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
        )}
      </MealContextConsumer>
    );
  }
  BrowseNavigator.router = Base.router;

  return BrowseNavigator;
}
