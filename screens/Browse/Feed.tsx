import React from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from "react-native";
import { padding } from "../../lib/theme";
import Padded from "../../components/Padded";
import Card from "../../components/Card";
import { NavigationScreenConfigProps } from "react-navigation";
import Recipe from "../../lib/Recipe";
import SafeView from "../../components/SafeView";
import { recipes } from "../../data";

const styles = StyleSheet.create({
  feedTrack: {
    backgroundColor: "rgba(0,0,0,0.05)"
  }
});

interface FeedItemProps {
  recipe: Recipe;
  onPress: () => void;
}

function FeedItem({ recipe, onPress }: FeedItemProps) {
  return (
    <Card>
      <TouchableOpacity
        onPress={onPress}
        delayPressIn={30}
        style={{ flexDirection: "column" }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.07)",
            aspectRatio: 1,
            flexDirection: "column",
            alignItems: "stretch"
          }}
        >
          <Image
            style={{ flex: 1, width: "100%", height: "100%" }}
            resizeMode="contain"
            source={recipe.images[0]}
          />
        </View>
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
      contentContainerStyle={{
        paddingBottom: padding * 3
      }}
      style={styles.feedTrack}
    >
      <SafeView>
        {Object.entries(recipes).map(([id, recipe]) => (
          <FeedItem
            key={id}
            recipe={recipe}
            onPress={() => navigation.push("RecipeView", { recipeId: id })}
          />
        ))}
      </SafeView>
    </ScrollView>
  );
}

export default Feed;
