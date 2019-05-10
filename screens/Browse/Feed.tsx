import React from "react";
import { Asset } from "expo";
import { Image, View, ScrollView, TouchableOpacity, Text } from "react-native";
import SafeView from "../../components/SafeView";
import { padding } from "../../lib/theme";
import Padded from "../../components/Padded";
import { NavigationScreenConfigProps } from "react-navigation";
import { RecipesScreenProps } from "./index";

// Temporary, until we have a recipe store
interface Recipe {
  id: string;
  photo: Asset;
  name: string;
  body: string;
}

interface FeedItemProps {
  recipe: Recipe;
  onPress: () => void;
}

function FeedItem({ recipe, onPress }: FeedItemProps) {
  return (
    <View>
      <Image style={{ width: "100%", height: 300 }} source={recipe.photo} />
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

const exampleRecipes: Recipe[] = [
  {
    id: "burritos",
    name: "Burritos",
    body: "Classic Mexican staple.",
    photo: require("../../assets/images/burritos.jpg")
  },
  {
    id: "chai",
    name: "Chai Latte",
    body: "Warm, sweet, and spicy. Perfect for a cold day.",
    photo: require("../../assets/images/chai-latte.jpg")
  },
  {
    id: "pancakes",
    name: "Pancakes",
    body: "Easy and tasty breakfast.",
    photo: require("../../assets/images/pancakes.jpg")
  },
  {
    id: "steak",
    name: "Steak",
    body: "Juicy and delicious.",
    photo: require("../../assets/images/steak.jpg")
  }
];

function Feed({ screenProps }: NavigationScreenConfigProps) {
  const { setRecipes } = screenProps as RecipesScreenProps;
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: padding * 3 }}>
      <SafeView>
        <Padded all>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            Browse Recipes
          </Text>
        </Padded>
        {exampleRecipes.map(recipe => (
          <Padded key={recipe.id} top={1} bottom={2}>
            <FeedItem
              recipe={recipe}
              onPress={() => setRecipes(r => [...r, recipe.id])}
            />
          </Padded>
        ))}
      </SafeView>
    </ScrollView>
  );
}

export default Feed;
