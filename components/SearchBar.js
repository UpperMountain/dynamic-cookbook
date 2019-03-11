import React from "react";
import { StyleSheet, View, TextInput, Keyboard } from "react-native";
<<<<<<< HEAD
import FontAwesome, { Icons } from "react-native-fontawesome";
=======
import { FontAwesome } from "@expo/vector-icons";
>>>>>>> general progress

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
        marginTop: 56,
        width: 315,
        height: 56,
        backgroundColor: "rgba(255, 255, 255, .2)",
        borderRadius: 72,
        paddingLeft: 36,
        paddingRight: 36,
        display: "flex",
        flexDirection: "row",
<<<<<<< HEAD
        alignItems: "center",
        justifyContent: "center"
=======
        alignItems: "center"
>>>>>>> general progress
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
<<<<<<< HEAD
          onFocus={() => this.setState({ editing: true })}
=======
>>>>>>> general progress
          style={styles.text}
          placeholder={"Search Recipes..."}
          placeholderTextColor={"white"}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
<<<<<<< HEAD
        {this.state.editing ? (
          <FontAwesome style={{ color: "white" }}>{Icons.times}</FontAwesome>
        ) : (
          <FontAwesome style={{ color: "white" }}>{Icons.search}</FontAwesome>
=======
        {this.props.open ? (
          <FontAwesome name={"close"} color={"white"} size={18} />
        ) : (
          <FontAwesome name={"search"} color={"white"} size={18} />
>>>>>>> general progress
        )}
      </View>
    );
  }
}

export default SearchBar;
