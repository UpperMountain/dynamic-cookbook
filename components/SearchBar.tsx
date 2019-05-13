import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  bar: {
    height: 50,
    backgroundColor: "rgba(0, 0, 0, .05)",
    borderRadius: 50,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    flex: 1
  },
  button: {
    height: "100%",
    width: 50,
    paddingRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export interface Props {
  value: string;
  onChange: (value: string) => void;
}

interface State {
  open: boolean;
}

class SearchBar extends React.Component<Props, State> {
  state = {
    open: false
  };

  render() {
    const { open } = this.state;
    const { value, onChange } = this.props;

    return (
      <View style={styles.bar}>
        <TextInput
          style={styles.text}
          placeholder="Search Recipes..."
          placeholderTextColor="black"
          onChangeText={e => onChange(e)}
          onFocus={() => this.setState({ open: true })}
          onBlur={() => this.setState({ open: false })}
          value={value}
        />
        {open ? (
          <TouchableOpacity onPress={() => onChange("")} style={styles.button}>
            <FontAwesome name="close" color="black" size={18} />
          </TouchableOpacity>
        ) : (
          <View style={styles.button}>
            <FontAwesome name="search" color="black" size={18} />
          </View>
        )}
      </View>
    );
  }
}

export default SearchBar;
