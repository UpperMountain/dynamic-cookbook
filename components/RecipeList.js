import React from "react";
import { ScrollView } from "react-native";

export default (RecipeList = props => {
  const itemWidth = props.small ? 162 : 230;

  return (
    <ScrollView
      horizontal
      decelerationRate={0}
      snapToInterval={itemWidth}
      snapToAlignment={"center"}
    >
      {props.children}
    </ScrollView>
  );
});
