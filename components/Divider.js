import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

let styles = StyleSheet.create({
  outer: {
    width: '100%',
    paddingLeft: '20%',
    paddingRight: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff'
  },
  text: {
    textAlign: 'center',
    flex: .3,
    color: '#fff'
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  } 
});


export const HR = (props) =>{
  return(
    <View style={styles.outer}>
      <View style={[styles.line]}/>
      <Text style={styles.text}>{props.text}</Text>
      <View style={[styles.line]}/>
    </View>
  );
}

export const SpacedView = (props) => {
  return(
    <View style={[{height: props.height}, styles.container]}>
      {props.children}
    </View>
  )
}