import React from "react";
import { Image, ScrollView, TouchableOpacity, Text } from "react-native";
import SafeView from "../../components/SafeView";
import { padding } from "../../lib/theme";
import Padded from "../../components/Padded";
import { NavigationScreenConfigProps } from "react-navigation";
import Recipe from "../../lib/Recipe";
import { allRecipes } from "../../data";

interface FeedItemProps {
  recipe: Recipe;
  onPress: () => void;
}

function FeedItem({ recipe, onPress }: FeedItemProps) {
  return (
    <TouchableOpacity onPress={onPress} delayPressIn={30}>
      <Image style={{ width: "100%", height: 300 }} source={recipe.images[0]} />
      <Padded horizontal>
        <Padded top>
          <Text style={{ fontSize: 30 }}>{recipe.name}</Text>
        </Padded>
        <Padded top={0.5} bottom>
          <Text>{recipe.body}</Text>
        </Padded>
      </Padded>
    </TouchableOpacity>
  );
}

function Feed({ navigation }: NavigationScreenConfigProps) {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: padding * 3 }}>
      <SafeView>
        {Object.entries(allRecipes).map(([id, recipe]) => (
          <Padded key={id} top={1} bottom={2}>
            <FeedItem
              recipe={recipe}
              onPress={() => navigation.push("RecipeView", { recipeId: id })}
            />
          </Padded>
        ))}
      </SafeView>
    </ScrollView>
  );
}

export default Feed;
