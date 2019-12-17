// @flow

import * as firebase from "firebase";

var firebaseConfig = {
    
  };


export default class Firebase {

    static auth;

    static init(){
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        Firebase.auth = firebase.auth();
    }

}
