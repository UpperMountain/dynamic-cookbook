import React from "react";
import { ScrollView, Text } from "react-native";
import Padded from "../../components/Padded";
import SafeView from "../../components/SafeView";
import SearchBar from "../../components/SearchBar";
import ListItem from "../../components/ListItem";
import { NavigationScreenConfigProps } from "react-navigation";
import RecipeIndex, { QueryResult } from "../../lib/RecipeIndex";
import { recipes } from "../../data";
import { padding } from "../../lib/theme";

const DEBUG_PASSWORD = "when in the course of human events";

function Result({
  result,
  onOpenRecipe
}: {
  result: QueryResult;
  onOpenRecipe: (recipeId: string) => void;
}) {
  if (result.kind == "ingredient") {
    return (
      <ListItem name={result.ingredient.name} body="Ingredient">
        <Padded top={1 / 2}>
          <Text style={{ color: "rgba(0,0,0,0.55)" }}>Found in:</Text>
        </Padded>
        {result.foundIn.map((e, i) => (
          <Padded key={i} top={1 / 2}>
            <Result result={e} onOpenRecipe={onOpenRecipe} />
          </Padded>
        ))}
      </ListItem>
    );
  } else if (result.kind === "recipe") {
    return (
      <ListItem
        name={result.recipe.name}
        body={result.recipe.body}
        image={result.recipe.images[0] || undefined}
        onPress={() => onOpenRecipe(result.id)}
      />
    );
  } else {
    const _exhaustiveCheck: never = result;
    return null;
  }
}

interface State {
  // Limit the max length of search query, so Fuse doesn't throw.
  // https://fusejs.io/#examples
  query: string; // max length 32

  // If the RecipeIndex is ready yet.
  ready: boolean;

  results: QueryResult[];
}

export default class Search extends React.Component<
  NavigationScreenConfigProps<any, any>,
  State
> {
  state = {
    ready: false,
    query: "",
    results: []
  };

  index?: RecipeIndex;

  async componentDidMount() {
    // Generate the search index
    this.index = new RecipeIndex(recipes);
    await this.index.ready;
    this.setState({ ready: true }, () => this.search(this.state.query));
  }

  private search = (query: string) => {
    const { ready } = this.state;

    // immediately update field
    this.setState({ query });

    // If it's the debug code, open the debug view
    if (query.toLowerCase() === DEBUG_PASSWORD) {
      const { navigation } = this.props;
      navigation.push("Debug");
    }

    // Run the search, iff the index is ready.
    if (ready) {
      const index = this.index as RecipeIndex; // definitely not undefined
      this.setState({ results: index.find(query) });
    }
  };

  render() {
    const { query, results } = this.state;
    const { navigation } = this.props;

    // ScrollView prop `keyboardShouldPersistTaps` is required to dismiss the
    // keyboard when you tap outside of the <SearchBar/>
    return (
      <SafeView>
        <Padded all>
          <SearchBar value={query} onChange={this.search} />
        </Padded>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: padding * 5 }}
        >
          {results.map((e, i) => (
            <Padded key={i} bottom horizontal>
              <Result
                result={e}
                onOpenRecipe={(recipeId: string) =>
                  navigation.push("RecipeView", { recipeId })
                }
              />
            </Padded>
          ))}
        </ScrollView>
      </SafeView>
    );
  }
}
