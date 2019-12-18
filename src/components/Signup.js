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
import firebase from './Firebase'
import 'firebase/firestore';

export default class Signup extends Component {

  constructor(){
    super()
    this.state={
        username: "",
        password: "",
    }

  }

  getUsername(text){
      //console.log(text);
      this.setState({
            username: text
          })
  }


  getPassword(text){
      //console.log(text);
      this.setState({
            password: text
          })
  }



  async signup_start(): Promise<void> {
      const that = this;
     // console.log(this.state.username, this.state.password);


      var username = this.state.username
      var password = this.state.password

      try {

          await firebase.auth().createUserWithEmailAndPassword(username, password);

          var firestore = firebase.firestore();
          var current_user = firebase.auth().currentUser.uid;

          const docRef = firestore.collection("users").doc(current_user);

          docRef.set({
              balance: 0,
              total_income: 0,
              total_outcome: 0,

              sum_salary: 0,
              sum_gift: 0,
              sum_passive: 0,
              sum_others: 0,

              sum_food: 0,
              sum_cloth: 0,
              sum_sport: 0,
              sum_entertainment: 0,
              sum_transport: 0,
              sum_others: 0,
              }).then(function(){
                    that.props.navigation.navigate('Dashboard')
                    console.log(" OK \n");
                  });

      } catch (e) {
          var errorCode = e.code;
          var errorMessage = e.message;
          console.log(errorMessage);
          alert("Try again.");
      }

  }

  render(){

    return (

      <View style = {styles.container}>

            <View style={styles.inputForm}>

              <Text style={styles.headerText}>Username</Text>
              <TextInput style={styles.inputStyle} onChangeText = {text => this.getUsername(text)} underlineColorAndroid={'black'} width={250}/>

              <Text style={styles.headerText}>Password</Text>
              <TextInput style={styles.inputStyle} onChangeText = {text => this.getPassword(text)} secureTextEntry={true} underlineColorAndroid={'black'} width={250}/>

              <TouchableOpacity style={styles.btn} onPress = {() => this.signup_start()}>
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
