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
  Picker,
  ScrollView,
  FlatList,
} from 'react-native';

import {Dimensions } from "react-native";


console.disableYellowBox = true;

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from './Firebase'
import 'firebase/firestore';



export default class History extends Component {

  constructor(){
    super()
    this.state={

        value: "",
        listIncome: true,
        listOutcome: false,
        check: true,
        check2:true,
        array:[],
        array2:[],
    }

  }

  UNSAFE_componentWillMount(){


      var firestore = firebase.firestore();
      var current_user = firebase.auth().currentUser.uid;
      const docRef = firestore.collection("users").doc(current_user).collection("income");

      let query = docRef.orderBy("date","desc").get()
      .then(snapshot => {

        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          if(!this.state.check)return
          var seconds = doc.data().date.seconds
          var d = new Date(seconds * 1000);
          const date = d.toISOString().slice(0, 10);



          const cat = doc.data().category
          const value = doc.data().value

          var new_array = [{date,cat,value}];
          //console.log(new_array);



         this.setState({ array: [...this.state.array, ...new_array ] })

        });

        if(this.state.check){
            this.setState({
                check: false
                })
        }


      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  renderIncomeList(){

      if(this.state.listIncome){

          return(

              <View style = {styles.scroll}>
                <ScrollView >
                <View style = {styles.scrollContent}>
                <FlatList
                 data={this.state.array}
                 renderItem={({item}) =>
                 <View style = {styles.items}>
                   <Text  style = {styles.scrollTxt}>{item.date}  </Text>
                   <Text  style = {styles.scrollTxt}>{item.cat}  </Text>
                   <Text  style = {styles.scrollTxt}>{item.value}  </Text>
                 </View>
                 }
                 keyExtractor={item => item.value}
               />
               </View>
                </ScrollView>
                    </View>
        )
      }
  }

  renderOutcomeList(){
      if(this.state.listOutcome){
          var firestore = firebase.firestore();
          var current_user = firebase.auth().currentUser.uid;
          const docRef = firestore.collection("users").doc(current_user).collection("outcome");

          let query = docRef.orderBy("date","desc").get()
          .then(snapshot => {

            if (snapshot.empty) {
              console.log('No matching documents.');
              return;
            }

            snapshot.forEach(doc => {
              //console.log(doc.id, '=>', doc.data());
              if(!this.state.check2)return

              var seconds = doc.data().date.seconds
              var d = new Date(seconds * 1000);
              const date = d.toISOString().slice(0, 10);



              const cat = doc.data().category
              const value = doc.data().value

              var new_array = [{date,cat,value}];
              //console.log(new_array);



             this.setState({ array2: [...this.state.array2, ...new_array ] })

            });

            if(this.state.check2){
                this.setState({
                    check2: false
                    })
            }


          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
          return(

              <View style = {styles.scroll}>
                <ScrollView >
                <View style = {styles.scrollContent}>
                <FlatList
                 data={this.state.array2}
                 renderItem={({item}) =>
                 <View style = {styles.items}>
                   <Text style = {styles.scrollTxt}>{item.date}  </Text>
                   <Text  style = {styles.scrollTxt}>{item.cat}  </Text>
                   <Text style = {styles.scrollTxt} >{item.value}  </Text>
                 </View>
                 }
                 keyExtractor={item => item.value}
               />
               </View>
                </ScrollView>
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
      <Text style={styles.dashboardHeader}>History</Text>


      <View style = {styles.container2}>
          <TouchableOpacity onPress = {this.incomePress}>
             <Text style={styles.btnIncome}>Income</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress = {this.outcomePress}>
             <Text style={styles.btnOutcome}>Outcome</Text>
          </TouchableOpacity>

    </View>

  {this.renderIncomeList()}
  {this.renderOutcomeList()}


        <View style = {styles.bottomNav}>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate('Action')}>
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

    scroll:{

        flexGrow:1,
        top: screenHeight-555,
        margin:10,

    },

    scrollContent:{
        flex:0.1,
        color:"blue",
        //justifyContent:"center",
        textAlign:"center",

    },

    items:{
        flexDirection: "row",
        alignContent:"space-around",
        justifyContent:"center",
    },

    scrollTxt:{
        fontSize:24,
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
