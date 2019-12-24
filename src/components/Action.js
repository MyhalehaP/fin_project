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
  Image,
} from 'react-native';

import {Dimensions} from 'react-native';

console.disableYellowBox = true;

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import firebase from './Firebase';
import 'firebase/firestore';

export default class Action extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      listIncome: true,
      listOutcome: false,
      category: 'others',
    };
  }

  getValue(text) {
    this.setState({
      value: text,
    });
    //console.log(text);
  }

  renderIncomeList() {
    if (this.state.listIncome) {
      return (
        <View style={styles.listIn}>
          <Picker
            selectedValue={this.state.category}
            style={styles.dropList}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({category: itemValue})
            }>
            <Picker.Item label="Salary" value="salary" />
            <Picker.Item label="Gift" value="gift" />
            <Picker.Item label="Passive" value="passive" />
            <Picker.Item label="Others" value="others" />
          </Picker>
        </View>
      );
    }
  }

  renderOutcomeList() {
    if (this.state.listOutcome) {
      return (
        <View style={styles.listIn}>
          <Picker
            selectedValue={this.state.category}
            style={styles.dropList}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({category: itemValue})
            }>
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Cloth" value="cloth" />
            <Picker.Item label="Sport" value="sport" />
            <Picker.Item label="Entertainment" value="entertainment" />
            <Picker.Item label="Transport" value="transport" />
            <Picker.Item label="Taxes" value="taxes" />
            <Picker.Item label="Others" value="others" />
          </Picker>
        </View>
      );
    }
  }

  incomePress = () => {
    this.setState({
      listIncome: true,
      listOutcome: false,
    });
  };

  outcomePress = () => {
    this.setState({
      listIncome: false,
      listOutcome: true,
    });
  };

  submitValue = () => {
    var firestore = firebase.firestore();
    var current_user = firebase.auth().currentUser.uid;
    const docRef = firestore.collection('users').doc(current_user);

    var d = new Date();
    var time = Number(d.getTime());
    var val = Number(this.state.value);

    if (this.state.listIncome) {
      firestore.runTransaction(async transaction => {
        const doc = await transaction.get(docRef);

        const newBalance = doc.data().balance + val;
        const newTotalIncome = doc.data().total_income + val;
        transaction.update(docRef, {
          balance: newBalance,
          total_income: newTotalIncome,
        });
      });

      const inRef = docRef.collection('income').doc(
        Math.random()
          .toString(36)
          .substr(2, 9),
      );
      const cat = this.state.category;
      console.log(cat);

      switch (cat) {
        case 'salary':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newSalary = doc.data().sum_salary + val;
            transaction.update(docRef, {
              sum_salary: newSalary,
            });
          });
          inRef.set({
            value: val,
            category: cat,
            date: d,
          });

          break;

        case 'gift':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newGift = doc.data().sum_gift + val;
            transaction.update(docRef, {
              sum_gift: newGift,
            });
          });
          inRef.set({
            value: val,
            category: cat,
            date: d,
          });

          break;

        case 'passive':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newPassive = doc.data().sum_passive + val;
            transaction.update(docRef, {
              sum_passive: newPassive,
            });
          });
          inRef.set({
            value: val,
            category: cat,
            date: d,
          });

          break;

        case 'others':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newOthers = doc.data().sum_others_in + val;
            transaction.update(docRef, {
              sum_others_in: newOthers,
            });
          });
          inRef.set({
            value: val,
            category: cat,
            date: d,
          });
          break;
      }
    } else if (this.state.listOutcome) {
      firestore.runTransaction(async transaction => {
        const doc = await transaction.get(docRef);

        const newBalance = doc.data().balance - val;
        const newTotalOutcome = doc.data().total_outcome + val;
        transaction.update(docRef, {
          balance: newBalance,
          total_outcome: newTotalOutcome,
        });
      });

      const outRef = docRef.collection('outcome').doc(
        Math.random()
          .toString(36)
          .substr(2, 9),
      );
      const cat = this.state.category;
      console.log(cat);
      switch (cat) {
        case 'food':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newFood = doc.data().sum_food + val;
            transaction.update(docRef, {
              sum_food: newFood,
            });
          });
          outRef.set({
            value: val,
            category: cat,
            date: d,
          });
          break;
        case 'cloth':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newCloth = doc.data().sum_cloth + val;
            transaction.update(docRef, {
              sum_cloth: newCloth,
            });
          });
          outRef.set({
            value: val,
            category: cat,
            date: d,
          });
          break;
        case 'sport':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newSport = doc.data().sum_sport + val;
            transaction.update(docRef, {
              sum_sport: newSport,
            });
          });
          outRef.set({
            value: val,
            category: cat,
            date: d,
          });
          break;
        case 'entertainment':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newEnter = doc.data().sum_entertainment + val;
            transaction.update(docRef, {
              sum_entertainment: newOthers,
            });
          });
          outRef.set({
            value: val,
            category: cat,
            date: d,
          });
          break;
        case 'transport':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newTransp = doc.data().sum_transport + val;
            transaction.update(docRef, {
              sum_transport: newTransp,
            });
          });
          outRef.set({
            value: val,
            category: cat,
            date: d,
          });
          break;
        case 'taxes':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newTax = doc.data().sum_taxes + val;
            transaction.update(docRef, {
              sum_taxes: newTax,
            });
          });
          outRef.set({
            value: val,
            category: cat,
            date: d,
          });
          break;
        case 'others':
          firestore.runTransaction(async transaction => {
            const doc = await transaction.get(docRef);
            const newOthers = doc.data().sum_others_out + val;

            transaction.update(docRef, {
              sum_others_out: newOthers,
            });
          });

          outRef.set({
            value: val,
            category: cat,
            date: d,
          });
          break;
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.ActionHeader}>Action</Text>

        <View style={styles.container2}>
          <TouchableOpacity onPress={this.incomePress}>
            <Text style={styles.btnIncome}>Income</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.outcomePress}>
            <Text style={styles.btnOutcome}>Outcome</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.valueInput}
          onChangeText={text => this.getValue(text)}
          underlineColorAndroid={'black'}
          width={150}
        />
        {this.renderIncomeList()}
        {this.renderOutcomeList()}

        <TouchableOpacity style={styles.submit} onPress={this.submitValue}>
          <Text style={styles.btn}>Submit</Text>
        </TouchableOpacity>

        <View style={styles.bottomNav}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Dashboard')}>
            <Text style={styles.btn}>
              {/*{walletIcon}*/}
              <Image
                source={require('../assets/icons/png/wallet.png')}
                fadeDuration={0}
                style={{width: 40, height: 40}}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Action')}>
            <Text style={styles.btn}>
              <Image
                source={require('../assets/icons/png/addButton.png')}
                fadeDuration={0}
                style={{width: 95, height: 55}}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('History')}>
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
}

const screenHeight = Math.round(Dimensions.get('window').height); // статична ширина та висота екрану смартфона
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EBEA',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: 150,
    marginBottom: 50,
    padding: 10,
  },

  submit: {
    backgroundColor: '#EC9B3B',
    flex: 0,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: screenHeight - 150,
  },

  dropList: {
    height: 25,
    width: 200,
    alignSelf: 'center',
    top: 320,
  },

  btnIncome: {
    color: 'white',
    backgroundColor: '#EC9B3B',
    fontSize: 24,
    padding: 10,
    width: 150,
    textAlign: 'center',
  },

  btnOutcome: {
    color: 'white',
    backgroundColor: '#293462',
    fontSize: 24,
    padding: 10,
    width: 150,
    textAlign: 'center',
  },

  valueInput: {
    flex: 0.35,
    textAlign: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: 250,
  },

  ActionHeader: {
    color: '#000000',
    fontSize: 14,
    paddingTop: 50,
    paddingBottom: 15,
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'center',
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
