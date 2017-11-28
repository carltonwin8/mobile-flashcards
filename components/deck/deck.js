import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  } from 'react-native';

export default class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.deck.title}` };
  };

  render() {
    const { title, cards } = this.props.navigation.state.params.deck;
    return (
      <View style={{flex: 1}}>
        <Text>{title}</Text>
        <Text>{cards} cards</Text>
        <TouchableOpacity>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
