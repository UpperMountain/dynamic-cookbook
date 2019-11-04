import React from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import { Share } from "react-native";
import { walkGroup, Ingredient } from "../../lib/graph";
import { MealContext, MealContextConsumer } from "../../lib/mealContext";
import { NavigationScreenConfigProps } from "react-navigation";
import Padded from "../../components/Padded";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import ListItem from "../../components/ListItem";
import Card from "../../components/Card";
import LowerThird from "../../components/LowerThird";
import { recipes as allRecipes } from "../../data";
import { RecipeSpec } from "../../lib/Recipe";
import shadow from "../../lib/shadow";
import { colorPrimary, padding } from "../../lib/theme";

function Section({
  name,
  aside,
  children
}: {
  name: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <Padded all style={{ flexDirection: "row", alignItems: "center" }}>
        <Heading style={{ flex: 1 }}>{name}</Heading>
        {aside}
      </Padded>
      {children}
    </Card>
  );
}

function shareIngredientsReport(ingredients: Ingredient[]) {
  const text = ingredients.map(e => `${e.name}: ${e.body}`).join("\n");
  Share.share(
    { title: "Meal Plan", message: text },
    { dialogTitle: "Send ingredients to..." }
  );
}

export function Plan({
  navigation,
  requires,
  recipes,
  working,
  removeRecipe
}: NavigationScreenConfigProps<any, any> & MealContext) {
  if (Object.keys(recipes).length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.05)",
          paddingTop: padding * 2
        }}
      >
        <Card>
          <Padded all>
            <Padded bottom>
              <Heading>No recipes</Heading>
            </Padded>
            <Text>
              You haven't added any recipes yet. Try searching for your favorite
              food, or scrolling through the recommended recipes.
            </Text>
          </Padded>
        </Card>
      </View>
    );
  }

  // If this takes a long time, move it to mealContext
  const ingredients: Ingredient[] = [];
  for (const node of walkGroup(requires)) {
    if (node.kind === "ingredient") {
      ingredients.push(node);
    }
  }

  // If this takes a long time, move it to mealContext
  let activeTime = 0;
  let passiveTime = 0;
  for (const node of walkGroup(requires)) {
    if (node.kind === "step") {
      activeTime += node.duration || 30;
      passiveTime += node.timer ? node.timer.duration : 0;
    }
  }

  const hasInformation = requires.length !== 0;

  return (
    <LowerThird
      third={
        <Padded bottom horizontal>
          <Button
            color={colorPrimary}
            size={50}
            onPress={() => navigation.navigate("MyMeal")}
            style={shadow(0.2)}
          >
            Start Cooking!
          </Button>
        </Padded>
      }
    >
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
                  onPress={() =>
                    navigation.push("RecipeView", { recipeId: spec.id })
                  }
                />
                <Button
                  iconName="close"
                  onPress={() => removeRecipe(spec.id)}
                  style={{ marginLeft: padding / 2 }}
                />
              </Padded>
            );
          })}
        </Section>
        {(!hasInformation || working) && (
          <Card>
            <Padded all style={{ flexDirection: "row" }}>
              <ActivityIndicator style={{ marginRight: padding }} />
              {hasInformation ? (
                <Text>Recalculating requirements...</Text>
              ) : (
                <Text>Calculating requirements...</Text>
              )}
            </Padded>
          </Card>
        )}
        {hasInformation && (
          <>
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
            <Section
              name="Ingredients"
              aside={
                <Button
                  onPress={() => shareIngredientsReport(ingredients)}
                  iconName="share"
                  iconPad={8}
                />
              }
            >
              {ingredients.map((ing: Ingredient) => (
                <Padded horizontal bottom key={ing.name}>
                  <ListItem name={ing.name} body={ing.body} />
                </Padded>
              ))}
            </Section>
          </>
        )}
      </ScrollView>
    </LowerThird>
  );
}

export default function PlanContainer(
  props: NavigationScreenConfigProps<any, any>
) {
  return (
    <MealContextConsumer>
      {ctx => <Plan {...props} {...ctx} />}
    </MealContextConsumer>
  );
}
