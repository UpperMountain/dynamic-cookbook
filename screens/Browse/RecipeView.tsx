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
import { MaterialIcons } from "@expo/vector-icons";
import { Asset } from "expo";
import { NavigationScreenConfigProps } from "react-navigation";
import { RecipesScreenProps } from "./BrowseNavigator";
import { ParameterDef } from "../../lib/Recipe";
import { recipes } from "../../data";
import Padded from "../../components/Padded";
import { padding, colorPrimary } from "../../lib/theme";

const Hr = () => (
  <Padded top={5 / 2} bottom={3 / 2}>
    <View
      style={{ borderBottomColor: "rgba(0,0,0,0.3)", borderBottomWidth: 1 }}
    />
  </Padded>
);

const styles = StyleSheet.create({
  adjustButton: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  radio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10
  },
  radioInactive: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginRight: 20,
    backgroundColor: "rgba(0,0,0,0.05)"
  },
  radioActive: {
    backgroundColor: colorPrimary
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
  if (parameterDef.kind == "integer") {
    if (typeof value !== "number") {
      onChange(parameterDef.default);
    }
    return (
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <TouchableOpacity onPress={() => onChange(value - 1)}>
          <MaterialIcons name="remove-circle" size={50} color="gray" />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, width: 100, textAlign: "center" }}>
          {value}
        </Text>
        <TouchableOpacity onPress={() => onChange(value + 1)}>
          <MaterialIcons name="add-circle" size={50} color="gray" />
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
            <View
              style={[
                styles.radioInactive,
                id === value ? styles.radioActive : {}
              ]}
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
    const { config } = this.state;
    const { setRecipes } = screenProps as RecipesScreenProps;

    const recipeId: string | null = navigation.getParam("recipeId", null);
    if (recipeId == null) {
      throw "Can't open recipe view into null recipe";
    }

    const recipe = recipes[recipeId];
    if (typeof recipe === "undefined") {
      throw "Recipe ID doesn't exist.";
    }

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
          <TouchableOpacity
            style={{
              backgroundColor: colorPrimary,
              borderRadius: 30,
              padding: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => setRecipes(r => [...r, { id: recipeId, config }])}
          >
            <Text>Add to Meal</Text>
          </TouchableOpacity>
        </Padded>
      </ScrollView>
    );
  }
}

export default RecipeView;
