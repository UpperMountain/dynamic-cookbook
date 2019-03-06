import React from "react";
import {LinearGradient, Font} from 'expo';
import {StyleSheet, View} from "react-native";
import RoundedButton from './components/RoundedButton';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';

export default class App extends React.Component {
  constructor(){
    super();
    this.state= {
      fontLoaded: false,
    }
  }

  async componentDidMount(){
    await Font.loadAsync({
      'raleway': require('./assets/fonts/Raleway-Regular.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
    });
    this.setState({fontLoaded: true});
  }

  render() {
    return (
      <View style={styles.container}>
      <LinearGradient style={styles.background} colors={['#FFAFBD', '#FFC3A0']}>
      {this.state.fontLoaded ? (
        <View>
          <SearchBar/>
          <Toast headerText={"Toast"} bodyText={"This is an example of toast which pops up from the bottom"}/>
        </View>
          ) : null}
      </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
