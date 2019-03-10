import React from "react";
import { StyleSheet, View, TextInput, Keyboard } from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";

class SearchBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      text: ""
    };
  }

  render() {
    const styles = StyleSheet.create({
      bar: {
        width: 315,
        height: 56,
        backgroundColor: "rgba(255, 255, 255, .2)",
        borderRadius: 72,
        paddingLeft: 36,
        paddingRight: 36,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      },
      text: {
        fontFamily: "raleway",
        fontSize: 18,
        color: "white",
        flex: 1
        // lineHeight: 32,
        // flexDirection: 'row'
      }
    });

    return (
      <View style={styles.bar}>
        <TextInput
          onFocus={() => this.setState({ editing: true })}
          style={styles.text}
          placeholder={"Search Recipes..."}
          placeholderTextColor={"white"}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        {this.state.editing ? (
          <FontAwesome style={{ color: "white" }}>{Icons.times}</FontAwesome>
        ) : (
          <FontAwesome style={{ color: "white" }}>{Icons.search}</FontAwesome>
        )}
      </View>
    );
  }
}

export default SearchBar;
