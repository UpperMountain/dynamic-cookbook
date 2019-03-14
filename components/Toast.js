import React from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert
} from "react-native";
import RoundedButton from "./RoundedButton";
import theme from "../lib/theme";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: 320,
    width: 304,
    borderTopLeftRadius: 39,
    borderTopRightRadius: 39,
    backgroundColor: "white",
    paddingTop: 42,
    paddingLeft: 35,
    paddingRight: 35
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class Toast extends React.Component {
  constructor(props) {
    super();
    this.state = {
      open: false
    };
  }

  toggle = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <View>
        <RoundedButton clear text="Test Button" onPress={this.toggle} />
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.open}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modal}
            onPress={this.toggle}
          >
            <TouchableWithoutFeedback>
              <View style={[styles.container, theme.shadow]}>
                <Text style={theme.header}>{this.props.headerText}</Text>
                <Text style={theme.body}>{this.props.bodyText}</Text>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
export default Toast;
