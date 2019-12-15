// @flow

import * as firebase from "firebase";

var firebaseConfig = {
    //nothing to see here
  };


export default class Firebase {

    static auth;

    static init(){
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        Firebase.auth = firebase.auth();
    }

}
