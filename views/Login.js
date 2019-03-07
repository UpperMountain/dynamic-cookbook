import React from 'react';
import {LinearGradient} from 'expo';
import {View, StyleSheet, Image, Text} from 'react-native';
import RoundedButton from '../components/RoundedButton';
import {HR, Spacer} from '../components/Divider';

class LoginPage extends React.Component{
  constructor(props){
    super();
  }

  render(){
    return(
      <View style={styles.container}>
        <LinearGradient style={styles.background} colors={['#FFAFBD', '#FFC3A0']}>
          <Spacer size={.3}/>
          <Image style={styles.logo} source={require('../assets/images/CookieLogo.png')}/>
          <Spacer size={.3}/>

          <RoundedButton clear text={'Login'}/>
          <Spacer/>
          <RoundedButton style={{
            backgroundColor: 'white',
            textColor: '#FFC3A0',
            borderColor: 'white'
          }} text={'Register'}/>
          
          <Spacer/>
          <HR text={'or'}/>
          <Spacer/>

          <RoundedButton style={{
            background: '#DB4437',
            textColor: '#fff',
            borderColor: '#DB4437'
          }} text={'Sign in With Google'}/>

          <Spacer/>

          <RoundedButton style={{
            background: '#3C5A99',
            textColor: '#fff',
            borderColor: '#3C5A99'
          }} text={'Continue With Facebook'}/>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200
  },
});

export default LoginPage;