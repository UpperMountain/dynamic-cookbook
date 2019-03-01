import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const styles = ({background, borderColor, textColor, width}) => StyleSheet.create({
  button: {
    width: width || 315,
    height: 56,
    backgroundColor: background || 'white',
    borderColor: borderColor || 'black',
    borderWidth: 3,
    borderRadius: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: textColor || 'black',
    lineHeight: 32,
    fontFamily: 'raleway-bold',
    flexDirection: 'row',
  },
})

const RoundedButton = (props) => {
  let currentStyle = null;
  if(props.clear){
    currentStyle = styles({
      background: 'transparent',
      textColor: 'white',
      borderColor: 'white'
    });
  }else{
    currentStyle = styles(props.style || {})
  }
  return(
    <TouchableOpacity style={currentStyle.button} onPress={props.onPress}>
      <Text style={currentStyle.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;