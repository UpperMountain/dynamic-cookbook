import React from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Asset } from "expo";
import Padded from "../../components/Padded";
import SafeView from "../../components/SafeView";
import SearchBar from "../../components/SearchBar";
import { NavigationScreenConfigProps } from "react-navigation";
import RecipeIndex, { QueryResult } from "../../lib/RecipeIndex";
import { recipes } from "../../data";
import { padding } from "../../lib/theme";

const styles = StyleSheet.create({
  result: {
    display: "flex",
    flexDirection: "row"
  },
  resultImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.05)",
    overflow: "hidden"
  },
  resultImage: {
    width: 50,
    height: 50
  },
  resultBody: {
    flex: 1,
    marginLeft: 15
  },
  resultBodyText: {
    height: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

const ResultItem = ({
  name,
  body,
  children,
  image,
  onPress
}: {
  name: string;
  body?: string;
  image?: Asset;
  children?: React.ReactNode;
  onPress?: () => void;
}) => {
  const contents = (
    <React.Fragment>
      <View style={styles.resultImageContainer}>
        {image && <Image style={styles.resultImage} source={image} />}
      </View>
      <View style={styles.resultBody}>
        <View style={styles.resultBodyText}>
          <Text numberOfLines={1}>{name}</Text>
          {body && (
            <Text numberOfLines={1} style={{ color: "rgba(0,0,0,0.55)" }}>
              {body}
            </Text>
          )}
        </View>
        {children}
      </View>
    </React.Fragment>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.result}>
        {contents}
      </TouchableOpacity>
    );
  } else {
    return <View style={styles.result}>{contents}</View>;
  }
};

function Result({
  result,
  onOpenRecipe
}: {
  result: QueryResult;
  onOpenRecipe: (recipeId: string) => void;
}) {
  if (result.kind == "ingredient") {
    return (
      <ResultItem name={result.ingredient.name} body={result.ingredient.body}>
        <Padded top={1 / 2}>
          <Text style={{ color: "rgba(0,0,0,0.55)" }}>Found in:</Text>
        </Padded>
        {result.foundIn.map((e, i) => (
          <Padded key={i} top={1 / 2}>
            <Result result={e} onOpenRecipe={onOpenRecipe} />
          </Padded>
        ))}
      </ResultItem>
    );
  } else if (result.kind === "recipe") {
    return (
      <ResultItem
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

  results: QueryResult[];
}

export default class Search extends React.Component<
  NavigationScreenConfigProps,
  State
> {
  state = {
    query: "",
    results: []
  };

  index?: RecipeIndex;

  componentDidMount() {
    // Generate the search index
    this.index = new RecipeIndex(recipes);
  }

  private search = (query: string) => {
    // immediately update field
    this.setState({ query });

    // run the search
    const index = this.index as RecipeIndex; // definitely not undefined
    this.setState({ results: index.find(query) });
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
