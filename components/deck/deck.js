import React from 'react';
import {
  Text,
  View,
  } from 'react-native';

export default class Deck extends React.Component {
  state = {
    name: '',
  };

  static navigationOptions = ({ navigation }) => {
    const name = navigation.state.params.deck || 'unknown';
    this.setState(() => {name});
    return { title: `${name} deck` };
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>{this.state.name}</Text>
        <Text>3 cards</Text>
        <Text>Add Card</Text>
        <Text>Start Quiz</Text>
      </View>
    );
  }
}
