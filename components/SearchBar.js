import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

class SearchBar extends React.Component{
  constructor(props){
    super();
    this.state = {
      text: ''
    };
  }
  
  render(){
    const styles = StyleSheet.create({
      bar: {
        width: 315,
        height: 56,
        backgroundColor: 'rgba(255, 255, 255, .2)',
        borderRadius: 72,
        paddingLeft: 36,
        justifyContent: "center"
      },
      text: {
        fontFamily: 'raleway',
        fontSize: 18,
        color: 'white',
        // lineHeight: 32,
        // flexDirection: 'row'
      }
    });
    
    return(
      <View style={styles.bar}>
        <TextInput style={styles.text} placeholder={'Search Recipes...'} placeholderTextColor={'white'}
        onChangeText={(text) => this.setState({text})} value={this.state.text}/>
      </View>
    );
  }

}

export default SearchBar;