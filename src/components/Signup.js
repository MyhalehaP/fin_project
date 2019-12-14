/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class Signup extends Component {

  constructor(){
    super()
    this.state={
        username: "",
        password: "",
    }

  }

  buttonPressed(text){
      //console.log(text);

      this.setState({
            resultText: this.state.resultText+text
          })
  }

  render(){

    return (

      <View style = {styles.container}>
            <View style={styles.inputForm}>

              <Text style={styles.headerText}>Username</Text>
              <TextInput style={styles.inputStyle} underlineColorAndroid={'black'} width={250}/>

              <Text style={styles.headerText}>Password</Text>
              <TextInput style={styles.inputStyle} underlineColorAndroid={'black'} width={250}/>

              <TouchableOpacity style={styles.btn}>
                 <Text style={styles.loginText}>SIGN UP</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress = {() => this.props.navigation.navigate('Login')} style={styles.reg}>
                 <Text style={styles.regText}>I want to login</Text>
              </TouchableOpacity>

            </View>


          </View>

    );
  }
};



const styles = StyleSheet.create({
  container:{
    flex: 1,

  },

  inputForm:{
      flex: 1,
      justifyContent: "center",
      alignItems:"center",
      textAlign: "right",

  },


  headerText:{
      fontWeight: "bold",
      color: "#3498DB",
      paddingBottom: 10,
      justifyContent: "center",

  },
  loginText:{
        color:"white",
        textAlign:"center",
        fontWeight:"bold",
  },

  regText:{
      fontWeight:"bold",
      color:"#3498DB",
  },

  btn:{
    width:150,
    height: 50,


    backgroundColor:"#3498DB",
    justifyContent: "center",

  },
  reg:{
    paddingTop:15,
    textAlign:"center",
    justifyContent:"center"
  },


});
