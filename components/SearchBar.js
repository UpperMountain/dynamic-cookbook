import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  render() {
    const { open, text } = this.state;

    const styles = StyleSheet.create({
      bar: {
        height: 56,
        backgroundColor: "rgba(0, 0, 0, .1)",
        borderRadius: 72,
        paddingLeft: 36,
        paddingRight: 36,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      },
      text: {
        fontFamily: "raleway",
        fontSize: 18,
        flex: 1
        // lineHeight: 32,
        // flexDirection: 'row'
      }
    });

    return (
      <View style={styles.bar}>
        <TextInput
          style={styles.text}
          placeholder="Search Recipes..."
          placeholderTextColor="black"
          onChangeText={e => this.setState({ text: e })}
          value={text}
        />
        {open ? (
          <FontAwesome name="close" color="black" size={18} />
        ) : (
          <FontAwesome name="search" color="black" size={18} />
        )}
      </View>
    );
  }
}

export default SearchBar;
