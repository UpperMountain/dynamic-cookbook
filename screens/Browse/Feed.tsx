import React from "react";
import { Image, View, ScrollView, TouchableOpacity, Text } from "react-native";
import SafeView from "../../components/SafeView";
import { padding } from "../../lib/theme";
import Padded from "../../components/Padded";
import { NavigationScreenConfigProps } from "react-navigation";
import { RecipesScreenProps } from "./index";
import Recipe, { Recipes } from "../../lib/Recipe";

interface FeedItemProps {
  recipe: Recipe;
  onPress: () => void;
}

function FeedItem({ recipe, onPress }: FeedItemProps) {
  return (
    <View>
      <Image style={{ width: "100%", height: 300 }} source={recipe.images[0]} />
      <Padded horizontal>
        <Padded top>
          <Text style={{ fontSize: 30 }}>{recipe.name}</Text>
        </Padded>
        <Padded top={0.5} bottom>
          <Text>{recipe.body}</Text>
        </Padded>
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0,0,0,0.05)",
            borderRadius: 100,
            padding: 10
          }}
          onPress={onPress}
        >
          <Text style={{ textAlign: "center" }}>Add to Meal</Text>
        </TouchableOpacity>
      </Padded>
    </View>
  );
}

function Feed({ screenProps }: NavigationScreenConfigProps) {
  const { setRecipes } = screenProps as RecipesScreenProps;
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: padding * 3 }}>
      <SafeView>
        {Object.entries(Recipes).map(([id, recipe]) => (
          <Padded key={id} top={1} bottom={2}>
            <FeedItem
              recipe={recipe}
              onPress={() => setRecipes(r => [...r, id])}
            />
          </Padded>
        ))}
      </SafeView>
    </ScrollView>
  );
}

export default Feed;
