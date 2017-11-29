import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  } from 'react-native';

export default class AddDeck extends React.Component {
  submit = () => {
    console.log('submitted');
  }
  render() {
    return (<KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.question}>What is the title of your new deck?</Text>
      <View style={styles.vInput}>
        <TextInput placeholder='Deck Title' style={styles.input} />
      </View>
      <TouchableOpacity onPress={this.submit} style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  vInput: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 6,
    padding: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'aqua',
    borderRadius: 6,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
});
