/* Fixing a bug with firebase and react native */
import { decode, encode } from 'base-64'
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }

//The app

import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

//Gesture stuff
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';


//firebase
import firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey : 'AIzaSyDg7kvCDZ7x_gkQmAIHxiOO8LTbsnjRnWI',
  authDomain : 'hide-and-seek-bbd27.firebaseapp.com',
  projectId: 'hide-and-seek-bbd27'
}


var db;

export default function App() {

  var state = {
    name: '',
    partyId: '',
  }

  function createParty() {
    console.log('Creating Party')
    firebase.initializeApp(config);
    db = firebase.firestore()

    var partyNum = Math.floor(Math.random() * 1000).toString()
    //TODO check if the party exists or not by pulling a list from the database

    db.collection("Parties").doc(partyNum).set({
      GameStatus: 'setup',
      CircleMiddle: [],
      CircleRadius: [],
    )}
    .then(function(party) {
      console.log([party].id)
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

  }

  function joinParty() {
    console.log('Joining Party')
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Button onPress={createParty} title="Create Party"/>
        <Button style={styles.button} onPress={joinParty} title="Join Party"/>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button : {
    marginBottom: 20,
  }
});
