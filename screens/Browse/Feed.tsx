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
import Card from "../../components/Card";
import { NavigationScreenConfigProps } from "react-navigation";
import Recipe from "../../lib/Recipe";
import { recipes } from "../../data";

const styles = StyleSheet.create({
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
    <Card>
      <TouchableOpacity onPress={onPress} delayPressIn={30}>
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
    </Card>
  );
}

function Feed({ navigation }: NavigationScreenConfigProps) {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: padding * 3 }}
      style={styles.feedTrack}
    >
      {Object.entries(recipes).map(([id, recipe], i) => (
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
