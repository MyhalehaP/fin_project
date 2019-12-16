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
import Firebase from './Firebase'


export default class History extends Component {

  constructor(){
    super()
    // this.state={
    //     username: "",
    //     password: "",
    // }

  }



  render(){

    return (

      <View style = {styles.container}>
      <Text style={styles.dashboardHeader}>History</Text>


      <View style = {styles.container2}>
          <TouchableOpacity>
             <Text style={styles.btnMenu}>Income</Text>
          </TouchableOpacity>


          <TouchableOpacity>
             <Text style={styles.btnMenu}>Outcome</Text>
          </TouchableOpacity>

    </View>

        <View style = {styles.bottomNav}>
            <TouchableOpacity  onPress = {() => this.props.navigation.navigate('Action')}>
               <Text style={styles.btn}>Action</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => this.props.navigation.navigate('Dashboard')}>
               <Text style={styles.btn}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity >
               <Text style={styles.btn}>History</Text>
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
  container2:{
      flex:0.1,
      backgroundColor:"#3498DB",
      flexDirection: "row",
      alignContent: 'space-around',
      justifyContent:"center",
      alignSelf:"center",
      position: "absolute",
      top: 150,

  },

  btnMenu:{
      color:"white",
      fontSize:24,
      margin:10,

  },

  dashboardHeader:{
      fontWeight: "bold",
      color: "#3498DB",
      fontSize: 36,
      paddingBottom: 10,
      textAlign:"center",
      justifyContent: "center",

  },

  balance:{
      flex:1,
      backgroundColor:"#3498DB",
      borderWidth:5,
      borderColor:"#AED6F1",

  },

  diagram:{
      flex:1,
      marginTop:10,
      backgroundColor:"#3498DB",
      borderWidth:5,
      borderColor:"#AED6F1",



  },

  btn:{
    width:100,
    height: 50,
    color: "white",
    textAlign:"center",
    textAlignVertical: "center",
  },

  bottomNav:{
      flex:1,
      backgroundColor:"#3498DB",
      flexDirection: "row",
      alignContent: 'space-around',
      justifyContent:"center",
      alignSelf:"center",
      position: "absolute",
      bottom: 0,



  }

});
