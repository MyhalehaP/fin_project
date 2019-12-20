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
import firebase from './Firebase';
import 'firebase/firestore';

export default class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      balance: 'Loading...',
      food: '',
      cloth: '',
      sport: '',
      entertainment: '',
      transport: '',
      taxes: '',
      others: '',

      salary: 0,
      gift: 0,
      passive: 0,
      others_in: 0,

      totalIncome: 0,
      totalOutcome: 0,
    }
  }

  componentDidMount() {
    const didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        var firestore = firebase.firestore();
        var current_user = firebase.auth().currentUser.uid;

        const docRef = firestore.collection("users").doc(current_user);

        let getDoc = docRef.get()
          .then(doc => {

            this.setState({
              balance: doc.data().balance,
              food: doc.data().sum_food,
              cloth: doc.data().sum_cloth,
              sport: doc.data().sum_sport,
              entertainment: doc.data().sum_entertainment,
              transport: doc.data().sum_transport,
              taxes: doc.data().sum_taxes,
              others: doc.data().sum_others_out,

              salary: doc.data().sum_salary,
              gift: doc.data().sum_gift,
              passive: doc.data().sum_passive,
              others_in: doc.data().sum_others_in,

              totalIncome: doc.data().total_income,
              totalOutcome: doc.data().total_outcome,
            });

          });
      }
    );
  }


  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.dashboardHeader}>Dashboard</Text>
        <View style={styles.container2}>
          <View style={styles.balance}>
            <Text style={styles.textBalance}>{this.state.balance}</Text>
          </View>


          <View style={styles.expenses}>
            <Text style={styles.textExpenses}>Food: {this.state.food}</Text>
            <Text style={styles.textExpenses}>Cloth: {this.state.cloth}</Text>
            <Text style={styles.textExpenses}>Sport: {this.state.sport}</Text>
            <Text style={styles.textExpenses}>Entertainment: {this.state.entertainment}</Text>
            <Text style={styles.textExpenses}>Transport: {this.state.transport}</Text>
            <Text style={styles.textExpenses}>Taxes: {this.state.taxes}</Text>
            <Text style={styles.textExpenses}>Others: {this.state.others}</Text>
          </View>


          <View style={styles.income}>


            <Text style={styles.textExpenses}>Salary: {this.state.salary}</Text>
            <Text style={styles.textExpenses}>Gift: {this.state.gift}</Text>
            <Text style={styles.textExpenses}>Passive: {this.state.passive}</Text>
            <Text style={styles.textExpenses}>Others: {this.state.others_in}</Text>
            <Text style={styles.textExpenses}>Total Income: {this.state.totalIncome}</Text>
            <Text style={styles.textExpenses}>Total Outcome: {this.state.totalOutcome}</Text>

          </View>

        </View>

        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Action')}>
            <Text style={styles.btn}>Action</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.btn}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('History')}>
            <Text style={styles.btn}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 0.7,
    justifyContent: 'center',
  },

  dashboardHeader: {
    fontWeight: 'regular',
    color: '#000000',
    fontSize: 14,
    paddingBottom: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },

  balance: {
    flex: 1,
    backgroundColor: '#3498DB',
    borderWidth: 5,
    borderColor: '#AED6F1',
    justifyContent: 'center',
  },

  textBalance: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
  },

  textExpenses: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },

  expenses: {
    flex: 3,
    marginTop: 10,
    backgroundColor: '#3498DB',
    borderWidth: 5,
    borderColor: '#AED6F1',
    justifyContent: 'center',
  },

  income: {
    flex: 3,
    marginTop: 10,
    backgroundColor: '#3498DB',
    borderWidth: 5,
    borderColor: '#AED6F1',
    justifyContent: 'center',
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
