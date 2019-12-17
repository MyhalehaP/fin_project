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
  TouchableOpacity,
  Picker
} from 'react-native';

import {Dimensions } from "react-native";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Firebase from './Firebase'

export default class Action extends Component {

  constructor(){
    super()
    this.state={
        value: "",
        listIncome: false,
        listOutcome: false,
        category:"",
    }

  }


  getValue(text){
      this.setState({
          value: text
          })

          //console.log(text);
  }


  renderIncomeList(){
      if(this.state.listIncome){

          return(

              <View style ={styles.listIn}>
              <Picker selectedValue={this.state.category} style={styles.dropList}
              onValueChange={(itemValue, itemIndex) =>this.setState({category: itemValue})}>

                <Picker.Item label="Salary" value="salary" />
                <Picker.Item label="Gift" value="gift" />
                <Picker.Item label="Passive" value="passive" />
                <Picker.Item label="Other" value="other" />

              </Picker>
              </View>
        )


      }
  }

  renderOutcomeList(){
      if(this.state.listOutcome){

          return(

              <View style ={styles.listIn}>
              <Picker selectedValue={this.state.category} style={styles.dropList}
              onValueChange={(itemValue, itemIndex) =>this.setState({category: itemValue})}>

                <Picker.Item label="Food" value="food" />
                <Picker.Item label="Cloth" value="cloth" />
                <Picker.Item label="Sport" value="sport" />
                <Picker.Item label="Entertainment" value="entertainment" />
                <Picker.Item label="Transport" value="transport" />
                <Picker.Item label="Others" value="others" />

              </Picker>
              </View>
        )


      }
  }

  incomePress =()=>{
      this.setState({
          listIncome:true,
          listOutcome:false,
          })

  }

  outcomePress=()=>{
      this.setState({
          listIncome:false,
          listOutcome:true,
          })

  }

  render(){

    return (

      <View style = {styles.container}>
      <Text style={styles.dashboardHeader}>Action</Text>


      <View style = {styles.container2}>
          <TouchableOpacity onPress = {this.incomePress}>
             <Text style={styles.btnIncome}>Income</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress = {this.outcomePress}>
             <Text style={styles.btnOutcome}>Outcome</Text>
          </TouchableOpacity>

    </View>

     <TextInput style={styles.valueInput} onChangeText={text=> this.getValue(text)} underlineColorAndroid={'black'} width={150}/>
  {this.renderIncomeList()}
  {this.renderOutcomeList()}

        <View style = {styles.bottomNav}>
            <TouchableOpacity>
               <Text style={styles.btn}>Action</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => this.props.navigation.navigate('Dashboard')}>
               <Text style={styles.btn}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => this.props.navigation.navigate('History')} >
               <Text style={styles.btn}>History</Text>
            </TouchableOpacity>


        </View>


          </View>




    );
  }
};

const screenHeight = Math.round(Dimensions.get('window').height); // статична ширина та висота екрану смартфона
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    //backgroundColor:"yellow"

  },
  container2:{
      flex:0.1,
      backgroundColor:"white",
      flexDirection: "row",
      alignContent: 'space-around',
      justifyContent:"center",
      alignSelf:"center",
      position: "absolute",
      top: 150,

    },

    dropList:{
        height: 25,
        width:200,
        alignSelf:"center",
        top:320,
    },

  btnIncome:{
      color:"white",
      backgroundColor:"green",
      fontSize:24,
      padding:10,
      width:150,
      textAlign:"center",

  },

  btnOutcome:{
      color:"white",
      backgroundColor:"red",
      fontSize:24,
      padding:10,
      width:150,
      textAlign:"center",
  },

  valueInput:{

      flex:0.35,
      textAlign:"center",
      alignSelf:"center",
      position:"absolute",
      top:250,

  },

  dashboardHeader:{
      fontWeight: "bold",
      color: "#3498DB",
      fontSize: 36,
      paddingBottom: 10,
      textAlign:"center",
      justifyContent: "center",

  },


  btn:{
    width:100,
    height: 50,
    color: "white",
    textAlign:"center",
    textAlignVertical: "center",
  },

  bottomNav:{
      flex:0,
      backgroundColor:"#3498DB",
      flexDirection: "row",
      alignContent: 'space-around',
      justifyContent:"center",
      alignSelf:"center",
      position: "absolute",
      top: screenHeight-50,



  }

});
