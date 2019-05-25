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
import { RecipesScreenProps } from "./BrowseNavigator";
import { ParameterDef, getRecipeDefaults } from "../../lib/Recipe";
import { recipes } from "../../data";
import Padded from "../../components/Padded";
import Button from "../../components/Button";
import { padding, colorPrimary } from "../../lib/theme";

const Hr = () => (
  <Padded top={5 / 2} bottom={3 / 2}>
    <View
      style={{ borderBottomColor: "rgba(0,0,0,0.3)", borderBottomWidth: 1 }}
    />
  </Padded>
);

const styles = StyleSheet.create({
  radio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10
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
              iconTag={MaterialCommunityIcons}
              iconName={id === value ? "checkbox-blank-circle" : null}
              style={{ marginRight: padding }}
              color={id === value ? colorPrimary : undefined}
              iconColor="white"
              iconPad={12}
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
  config: { [key: string]: any };
}

class RecipeView extends React.Component<NavigationScreenConfigProps, State> {
  state = { config: {} };

  _setParam = (param: string, value: any) => {
    this.setState(s => ({ config: { ...s.config, [param]: value } }));
  };

  render() {
    const { screenProps, navigation } = this.props;
    const { config: storedConfig } = this.state;
    const {
      updateRecipe,
      recipes: addedRecipes
    } = screenProps as RecipesScreenProps;

    const recipeId: string | null = navigation.getParam("recipeId", null);
    if (recipeId == null) {
      throw "Can't open recipe view into null recipe";
    }

    const recipe = recipes[recipeId];
    if (typeof recipe === "undefined") {
      throw "Recipe ID doesn't exist.";
    }

    const defaults = getRecipeDefaults(recipe);
    const config = { ...defaults, ...storedConfig };

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingRight: padding }}
        >
          {recipe.images.map((image: Asset, i: number) => (
            <Image
              key={i}
              source={image}
              style={{
                height: 350,
                width: 350,
                marginLeft: padding,
                marginTop: padding
              }}
            />
          ))}
        </ScrollView>
        <Padded top horizontal>
          <Text style={{ fontSize: 30 }}>{recipe.name}</Text>
        </Padded>
        <Padded top horizontal>
          <Text>{recipe.body}</Text>
        </Padded>
        <Hr />
        {recipe.config.map(parameterDef => (
          <React.Fragment key={parameterDef.id}>
            <Padded top horizontal>
              <Text style={{ fontSize: 18 }}>{parameterDef.question}</Text>
            </Padded>
            <Padded all>
              <Configurator
                parameterDef={parameterDef}
                value={(config as any)[parameterDef.id]}
                onChange={val => this._setParam(parameterDef.id, val)}
              />
            </Padded>
          </React.Fragment>
        ))}
        <Padded top horizontal>
          <Button
            onPress={() => updateRecipe({ id: recipeId, config })}
            size={45}
            color={colorPrimary}
          >
            {addedRecipes[recipeId] == null ? "Add to Meal" : "Update Recipe"}
          </Button>
        </Padded>
      </ScrollView>
    );
  }
}

export default RecipeView;
