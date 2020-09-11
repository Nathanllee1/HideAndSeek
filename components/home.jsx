import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function home(props) {
  return (
    <View style={styles.container}>
      <Button onPress={props.createParty} title="Create Party"/>
      <Button style={styles.button} onPress={props.joinParty} title="Join Party"/>
    </View>
  )
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
