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
import Dashboard from './Dashboard';
import Action from './Action'
import History from './History'
import firebase from './Firebase';

class Login extends Component {

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

  async login_check(): Promise<void>{

      console.log(this.state.username,this.state.password);
      const that = this;
      var username = this.state.username
      var password = this.state.password

      try {
          await firebase.auth().signInWithEmailAndPassword(username, password);
          that.props.navigation.navigate('Dashboard')
          alert("Logged in");
      } catch (e) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert("Try again.");
      }


  }

  UNSAFE_componentWillMount() {
      const that = this

      firebase.auth().onAuthStateChanged(function(user) {

          if (user) {
            // User is signed in.
            var user = firebase.auth().currentUser;
            var email = user.email;

            that.props.navigation.navigate('Dashboard')
          }
});
       }


  render(){


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
    Dashboard: Dashboard,
    History: History,
    Action: Action,
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
