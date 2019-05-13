import React from "react";
import { Text } from "react-native";
import Padded from "../../components/Padded";
import SafeView from "../../components/SafeView";
import SearchBar from "../../components/SearchBar";

// TODO and important: Limit the max length of search query, so Fuse doesn't throw.
// https://fusejs.io/#examples

export default function Search() {
  return (
    <SafeView>
      <Padded all>
        <SearchBar />
      </Padded>
      <Text style={{ fontSize: 30 }}>Search view here, eventually.</Text>
    </SafeView>
  );
}
