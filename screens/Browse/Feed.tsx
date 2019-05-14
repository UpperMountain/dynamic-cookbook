import React from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { Constants } from "expo";
import { padding } from "../../lib/theme";
import Padded from "../../components/Padded";
import { NavigationScreenConfigProps } from "react-navigation";
import Recipe from "../../lib/Recipe";
import { allRecipes } from "../../data";
import shadow from "../../lib/shadow";

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: "white",
    ...shadow(0.1)
  },
  feedTrack: {
    backgroundColor: "rgba(0,0,0,0.05)"
  }
});

interface FeedItemProps {
  recipe: Recipe;
  onPress: () => void;

  // Make the first image taller, extending into the notch
  first: boolean;
}

function FeedItem({ recipe, onPress, first }: FeedItemProps) {
  return (
    <Padded bottom>
      <TouchableOpacity
        style={styles.feedItem}
        onPress={onPress}
        delayPressIn={30}
      >
        <Image
          style={{
            width: "100%",
            height: 300 + (first ? Constants.statusBarHeight : 0)
          }}
          source={recipe.images[0]}
        />
        <Padded horizontal top>
          <Text style={{ fontSize: 30 }}>{recipe.name}</Text>
        </Padded>
        <Padded horizontal top={1 / 2} bottom={3 / 2}>
          <Text>{recipe.body}</Text>
        </Padded>
      </TouchableOpacity>
    </Padded>
  );
}

function Feed({ navigation }: NavigationScreenConfigProps) {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: padding * 3 }}
      style={styles.feedTrack}
    >
      {Object.entries(allRecipes).map(([id, recipe], i) => (
        <FeedItem
          key={id}
          recipe={recipe}
          onPress={() => navigation.push("RecipeView", { recipeId: id })}
          first={i == 0}
        />
      ))}
    </ScrollView>
  );
}

export default Feed;
