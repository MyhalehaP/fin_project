// @flow

import * as firebase from "firebase";

var firebaseConfig = {
    //nothing to see here
    apiKey: "AIzaSyB3jxhQPeG4zfwpprW8Yz3hSvnD6gozqFY",
    authDomain: "fin-project-463b5.firebaseapp.com",
    databaseURL: "https://fin-project-463b5.firebaseio.com",
    projectId: "fin-project-463b5",
    storageBucket: "fin-project-463b5.appspot.com",
    messagingSenderId: "480404716874",
    appId: "1:480404716874:web:ffdff368a99faeb5bb15b3"
  };


export default class Firebase {

    static auth;

    static init(){
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        Firebase.auth = firebase.auth();
    }

}
