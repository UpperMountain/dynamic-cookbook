import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  View
} from "react-native";
import Markdown from "react-native-markdown-renderer";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Asset } from "expo";
import { NavigationScreenConfigProps } from "react-navigation";
import { ParameterDef, getRecipeDefaults } from "../../lib/Recipe";
import { MealContext, MealContextConsumer } from "../../lib/mealContext";
import { recipes as allRecipes } from "../../data";
import Padded from "../../components/Padded";
import Heading, { Heading2 } from "../../components/Heading";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { padding, colorPrimary } from "../../lib/theme";

const styles = StyleSheet.create({
  radio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

function Configurator({
  parameterDef,
  onChange,
  value
}: {
  parameterDef: ParameterDef;
  onChange: (value: any) => void;
  value: any;
}) {
  if (parameterDef.kind === "integer") {
    const delta = (d: number) => {
      let next = value + d * (parameterDef.step || 1);
      if (parameterDef.max !== null && next > parameterDef.max) {
        next = parameterDef.max;
      }
      if (parameterDef.min !== null && next < parameterDef.min) {
        next = parameterDef.min;
      }
      onChange(next);
    };
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: 60,
          width: 200,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 30,
          backgroundColor: "rgba(0,0,0,0.1)"
        }}
      >
        <TouchableOpacity onPress={() => delta(-1)}>
          <MaterialIcons
            name="remove"
            size={50}
            color={value == parameterDef.min ? "rgba(0,0,0,0.1)" : "gray"}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, flex: 1, textAlign: "center" }}>
          {value}
        </Text>
        <TouchableOpacity onPress={() => delta(+1)}>
          <MaterialIcons
            name="add"
            size={50}
            color={value == parameterDef.max ? "rgba(0,0,0,0.1)" : "gray"}
          />
        </TouchableOpacity>
      </View>
    );
  } else if (parameterDef.kind == "categorical") {
    return (
      <>
        {Object.entries(parameterDef.options).map(([id, text]) => (
          <TouchableOpacity
            key={id}
            style={styles.radio}
            onPress={() => onChange(id)}
          >
            <Button
              size={30}
              iconTag={MaterialCommunityIcons}
              iconName={id === value ? "checkbox-blank-circle" : null}
              style={{ marginRight: padding / 2 }}
              color={id === value ? colorPrimary : undefined}
              iconColor="white"
              iconPad={8}
            />
            <Markdown>{text}</Markdown>
          </TouchableOpacity>
        ))}
      </>
    );
  } else {
    const _exhaustiveCheck: never = parameterDef;
    return null;
  }
}

interface State {
  config: { [key: string]: any }; // ignored if config is in mealRecipes map
}

class RecipeView extends React.Component<
  NavigationScreenConfigProps & MealContext,
  State
> {
  state: State = { config: {} };

  getDataFromProps() {
    const { navigation } = this.props;

    const recipeId: string | null = navigation.getParam("recipeId", null);
    if (recipeId == null) {
      throw new Error("Can't open recipe view into null recipe");
    }

    const recipeDef = allRecipes[recipeId];
    if (typeof recipeDef === "undefined") {
      throw new Error("Recipe ID doesn't exist.");
    }

    const { updateRecipe, removeRecipe, recipes: mealRecipes } = this.props;

    return { recipeDef, id: recipeId, updateRecipe, removeRecipe, mealRecipes };
  }

  private setParam(param: string, value: any) {
    const { updateRecipe, mealRecipes, id } = this.getDataFromProps();
    if (typeof mealRecipes[id] === "undefined") {
      this.setState(s => ({ config: { ...s.config, [param]: value } }));
    } else {
      const spec = mealRecipes[id];
      updateRecipe({ id, config: { ...spec.config, [param]: value } });
    }
  }

  private getParam(param: string): any {
    const { config } = this.state;
    const { recipeDef, mealRecipes, id } = this.getDataFromProps();

    let val: any = null;
    if (typeof mealRecipes[id] === "undefined") {
      val = config[param] || null;
    } else {
      val = mealRecipes[id].config[param];
    }
    if (val === null) {
      return getRecipeDefaults(recipeDef)[param];
    } else {
      return val;
    }
  }

  private getConfig(): { [key: string]: any } {
    const { recipeDef } = this.getDataFromProps();
    const config: { [key: string]: any } = {};
    for (const param of recipeDef.config) {
      config[param.id] = this.getParam(param.id);
    }
    return config;
  }

  render() {
    const {
      recipeDef,
      mealRecipes,
      id,
      updateRecipe,
      removeRecipe
    } = this.getDataFromProps();
    const { navigation } = this.props;
    return (
      <ScrollView
        contentContainerStyle={{
          paddingBottom: padding * 4,
          backgroundColor: "rgba(0,0,0,0.05)"
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingRight: padding }}
        >
          {recipeDef.images.map((image: Asset, i: number) => (
            <Card
              key={i}
              shadowAmt={0.3}
              innerStyle={{
                margin: padding * 0.75,
                padding: padding * 0.25,
                marginRight: 0
              }}
              style={{ paddingBottom: 0 }}
            >
              <Image
                key={i}
                source={image}
                style={{
                  height: 350,
                  width: 350
                }}
              />
            </Card>
          ))}
        </ScrollView>
        <Card>
          <Padded all>
            <Heading>{recipeDef.name}</Heading>
          </Padded>
          <Padded bottom horizontal>
            <Text>{recipeDef.body}</Text>
          </Padded>
        </Card>
        <Card>
          <Padded all>
            <Heading>Recipe Options</Heading>
          </Padded>
          {recipeDef.config.map(parameterDef => (
            <React.Fragment key={parameterDef.id}>
              <Padded horizontal bottom={1 / 2}>
                <Heading2>{parameterDef.question}</Heading2>
              </Padded>
              <Padded horizontal bottom={1.5}>
                <Configurator
                  parameterDef={parameterDef}
                  value={this.getParam(parameterDef.id)}
                  onChange={val => this.setParam(parameterDef.id, val)}
                />
              </Padded>
            </React.Fragment>
          ))}
          <Padded all>
            {mealRecipes[id] == null ? (
              <Button
                size={45}
                color={colorPrimary}
                iconColor="black"
                iconName="add"
                onPress={() => {
                  updateRecipe({ id, config: this.getConfig() });
                  navigation.goBack();
                  navigation.navigate("Plan");
                }}
              >
                Add to Meal
              </Button>
            ) : (
              <Button
                size={45}
                iconName="remove"
                onPress={() => {
                  this.setState({ config: this.getConfig() });
                  removeRecipe(id);
                  navigation.goBack();
                }}
              >
                Remove from Meal
              </Button>
            )}
          </Padded>
        </Card>
      </ScrollView>
    );
  }
}

export default function RecipeViewContainer(
  props: NavigationScreenConfigProps
) {
  return (
    <MealContextConsumer>
      {ctx => <RecipeView {...props} {...ctx} />}
    </MealContextConsumer>
  );
}
