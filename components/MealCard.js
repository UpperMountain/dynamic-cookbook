import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {BlurView} from 'expo';

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})

const ImageContainer = (props) => {
  return(
    <View style={{
      width: props.width, 
      height: props.height,
      overflow: 'hidden',
      backgroundColor: 'white',
      borderRadius: 19
      }}>
        {props.children}
        <View style={{
          position: 'absolute',
          zIndex: 1,
          top: props.height * .8,
          width: props.width,
          height: props.height * .2,
          backgroundColor: 'rgba(255, 255, 255, .7)'
        }}>
        <BlurView tint={'light'} intensity={65} style={{
          width: props.width,
          height: props.height * .2,
        }}>
        </BlurView>
        </View>
    </View>
  )
}

export class MealCard extends React.Component{
  constructor(props){
    super();
    this.state = {
      
    }
  }

  render(){
    return(
      <View style={style.shadow}>
        <ImageContainer width={210} height={262}>
          <Image 
          style={{width: 210, height: 262}} 
          source={require('../assets/images/pancakes.jpg')}/>
        </ImageContainer>
      </View>
    );
  }
}

export class SmallMealCard extends React.Component{
  constructor(props){
    super();
    this.state = {

    }
  }

  render(){
    return(
      <View style={style.shadow}>
        <ImageContainer width={142} height={191}>
          <Image 
          style={{width: 142, height: 191}} 
          source={require('../assets/images/pancakes.jpg')}/>
        </ImageContainer>
      </View>
    );
  }
}