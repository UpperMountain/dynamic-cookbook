import React from "react";
import { StyleSheet, View, TextInput, Keyboard } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

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
        alignItems: "center"
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
          style={styles.text}
          placeholder={"Search Recipes..."}
          placeholderTextColor={"white"}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        {this.props.open ? (
          <FontAwesome name={"close"} color={"white"} size={18} />
        ) : (
          <FontAwesome name={"search"} color={"white"} size={18} />
        )}
      </View>
    );
  }
}

export default SearchBar;
