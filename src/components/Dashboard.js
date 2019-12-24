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
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

// import { PieChart } from "react-native-chart-kit";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import firebase from './Firebase';
import 'firebase/firestore';

import addButton from '../assets/icons/svg/history.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    const balance = this.state.balance;
    const months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];
    let now = new Date();
    let thisMonth = months[now.getMonth()];
    let thisDay = now.getDate();

    const addIcon = <Icon name="plus" type="feather" size={30} color="#900" />;
    const historyIcon = <Icon name="history" type="feather" size={30} color="#900" />;
    const walletIcon = <Icon name="wallet" type="feather" size={30} color="#900" />;

    return (
      <View style={styles.container}>
        <Text style={styles.dashboardHeader}>Dashboard</Text>
        <ScrollView>
          <View style={styles.container2}>
            <View style={styles.balance}>
              <Text style={styles.textBalanceTitle}>Balance</Text>
              <Text style={styles.textBalanceDate}>Today, {thisDay} {thisMonth}</Text>
              <Text style={styles.textBalance}>
                <Text style={styles.textBalanceCurrency}>$</Text>{balance}
              </Text>
            </View>
            <View style={styles.expenses}>
              <View>
                <Text style={styles.textBalanceTitle}>Expenses</Text>
              </View>
              <Text style={styles.textExpenses}>Food: {this.state.food}</Text>
              <Text style={styles.textExpenses}>Cloth: {this.state.cloth}</Text>
              <Text style={styles.textExpenses}>Sport: {this.state.sport}</Text>
              <Text style={styles.textExpenses}>Entertainment: {this.state.entertainment}</Text>
              <Text style={styles.textExpenses}>Transport: {this.state.transport}</Text>
              <Text style={styles.textExpenses}>Taxes: {this.state.taxes}</Text>
              <Text style={styles.textExpenses}>Others: {this.state.others}</Text>
            </View>

            <View style={styles.income}>
              <View>
                <Text style={styles.textBalanceTitle}>Income</Text>
              </View>
              <Text style={styles.textExpenses}>Salary: {this.state.salary}</Text>
              <Text style={styles.textExpenses}>Gift: {this.state.gift}</Text>
              <Text style={styles.textExpenses}>Passive: {this.state.passive}</Text>
              <Text style={styles.textExpenses}>Others: {this.state.others_in}</Text>
              <Text style={styles.textExpenses}>Total Income: {this.state.totalIncome}</Text>
              <Text style={styles.textExpenses}>Total Outcome: {this.state.totalOutcome}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity>
            <Text style={styles.btn}>
              {/*{walletIcon}*/}
              <Image
                source={require('../assets/icons/png/wallet.png')}
                fadeDuration={0}
                style={{width: 40, height: 40}}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Action')}>
            <Text style={styles.btn}>
              <Image
                source={require('../assets/icons/png/addButton.png')}
                fadeDuration={0}
                style={{width: 95, height: 55}}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('History')}>
            <Text style={styles.btn}>
              <Image
                source={require('../assets/icons/png/history.png')}
                fadeDuration={0}
                style={{width: 40, height: 40}}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EBEA',

  },
  container2: {
    flex: 1,
    marginBottom: 50,
    padding: 10,
    justifyContent: 'center',
  },

  dashboardHeader: {
    color: '#000000',
    fontSize: 14,
    paddingTop: 50,
    paddingBottom: 15,
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'center',
  },

  balance: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    padding: 15,
    textAlign: 'left',
    borderRadius: 15,
    margin: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 6,
  },

  textBalance: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 72,
    textAlign: 'center',
  },

  textBalanceCurrency: {
    color: '#929292',
    fontSize: 24,
    fontWeight: '600',
  },

  textBalanceTitle: {
    color: 'black',
    fontFamily: 'Cabin',
    fontWeight: '600',
    paddingTop: 10,
    fontSize: 24,
  },

  textBalanceDate: {
    color: '#929292',
    fontFamily: 'Cabin',
    fontSize: 12,
  },

  textExpenses: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },

  expenses: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    margin: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 6,
  },

  income: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    margin: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 6,
  },

  btn: {
    flex: 1,
    marginTop: -45,
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  bottomNav: {
    flex: 1,
    height: 65,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 0,
  },

});
