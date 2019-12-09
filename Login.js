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


export default class Login extends Component {

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
            </View>
          </View>

    );
  }
};



const styles = StyleSheet.create({
  container:{
    flex: 1
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

  }


});
