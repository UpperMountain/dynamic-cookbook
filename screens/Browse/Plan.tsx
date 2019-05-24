import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { walkGroup, simplifyGroup, Ingredient } from "../../lib/graph";
import { NavigationScreenConfigProps } from "react-navigation";
import { RecipesScreenProps } from "./BrowseNavigator";
import Padded from "../../components/Padded";
import ListItem from "../../components/ListItem";
import Card from "../../components/Card";
import { recipes as allRecipes } from "../../data";
import { RecipeSpec } from "../../lib/Recipe";
import { padding } from "../../lib/theme";
import { flatten } from "lodash";

function Section({
  name,
  children
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <Padded all>
        <Text style={{ fontSize: 20 }}>{name}</Text>
      </Padded>
      {children}
    </Card>
  );
}

export default function Plan({ screenProps }: NavigationScreenConfigProps) {
  const { removeRecipe, recipes } = screenProps as RecipesScreenProps;

  if (Object.keys(recipes).length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <Padded horizontal={2} vertical={3}>
          <Card shadowAmt={0.5}>
            <Padded horizontal={2} vertical={2}>
              <Text style={{ fontSize: 20, marginBottom: padding / 2 }}>
                No recipes
              </Text>
              <Text>
                You haven't added any recipes yet. Try searching for your
                favorite food, or scrolling through the recommended recipes.
              </Text>
            </Padded>
          </Card>
        </Padded>
      </View>
    );
  }

  // Generate and simplify the recipe
  const specProcedures = Object.values(recipes).map((spec: RecipeSpec) =>
    allRecipes[spec.id].requires(spec.config)
  );
  let requires = flatten(specProcedures);

  // group-simplify the required Procedures
  requires = simplifyGroup(requires);

  const ingredients: Ingredient[] = [];
  for (let node of walkGroup(requires)) {
    if (node.kind === "ingredient") {
      ingredients.push(node);
    }
  }

  let activeTime = 0;
  let passiveTime = 0;
  for (let node of walkGroup(requires)) {
    if (node.kind === "step") {
      activeTime += node.duration || 30;
      passiveTime += node.timer ? node.timer.duration : 0;
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
      contentContainerStyle={{
        paddingTop: padding,
        paddingBottom: padding * 4
      }}
    >
      <Section name="Recipes">
        {Object.values(recipes).map((spec: RecipeSpec) => {
          const recipe = allRecipes[spec.id];
          return (
            <Padded
              horizontal
              bottom
              key={spec.id}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <ListItem
                name={recipe.name}
                body={recipe.body}
                image={recipe.images[0] || undefined}
                style={{ flex: 1 }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(0,0,0,0.1)",
                  width: 30,
                  height: 30,
                  marginLeft: padding / 2,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => removeRecipe(spec.id)}
              >
                <MaterialIcons name="close" size={20} color="gray" />
              </TouchableOpacity>
            </Padded>
          );
        })}
      </Section>
      <Section name="Estimated Time">
        <View style={{ flexDirection: "row" }}>
          <Padded horizontal bottom>
            <Text>Active Time</Text>
            <Text style={{ fontSize: 25 }}>
              {Math.round(activeTime / 60)} min
            </Text>
          </Padded>
          <Padded horizontal bottom>
            <Text>Passive Time</Text>
            <Text style={{ fontSize: 25 }}>
              {Math.round(passiveTime / 60)} min
            </Text>
          </Padded>
        </View>
      </Section>
      <Section name="Ingredients">
        {ingredients.map((ing: Ingredient) => (
          <Padded horizontal bottom key={ing.name}>
            <ListItem name={ing.name} body={ing.body} />
          </Padded>
        ))}
      </Section>
    </ScrollView>
  );
}
