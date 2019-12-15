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

import Signup from './Signup';
import Firebase from './Firebase';

class Login extends Component {

  constructor(){
    super()

    this.state={
        username: "",
        password: "",
        initialized: 0,
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

  async login_check(): Promise<void>{

      console.log(this.state.username,this.state.password);

      var username = this.state.username
      var password = this.state.password

      try {
          await Firebase.auth.signInWithEmailAndPassword(username, password);
          alert("Logged in");
      } catch (e) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert("Try again.");
      }


  }



  render(){
      if(this.state.initialized == 0){
          Firebase.init()
          Firebase.auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        alert("Welcome back")
      } else {
        // No user is signed in.
        alert("Welcome!")
      }
    });
          this.setState({
              initialized: 1
              })
      }
    return (

      <View style = {styles.container}>

            <View style={styles.inputForm}>

              <Text style={styles.headerText}>Username</Text>
              <TextInput style={styles.inputStyle} onChangeText={text=> this.getUsername(text)} underlineColorAndroid={'black'} width={250}/>

              <Text style={styles.headerText}>Password</Text>
              <TextInput style={styles.inputStyle} secureTextEntry={true}  onChangeText={text=> this.getPassword(text)} underlineColorAndroid={'black'} width={250}/>

              <TouchableOpacity style={styles.btn}  onPress = {() => this.login_check()}>
                 <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress = {() => this.props.navigation.navigate('Signup')} style={styles.reg}>
                 <Text style={styles.regText}>Sign Up</Text>
              </TouchableOpacity>
            </View>


          </View>

    );
  }
};



const RootStack = createStackNavigator({

    Login: Login,
    Signup: Signup,
    },

    {
    initialRouteName: 'Login',

    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }


    }

    );

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container:{
    flex: 1,

  },

  inputForm:{
      flex: 1,
      justifyContent: "center",
      alignItems:"center",
      textAlign: 'right',

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
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
