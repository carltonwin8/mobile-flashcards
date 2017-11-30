import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  } from 'react-native';

export default class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.deck.title}` };
  };

  render() {
    const deck = this.props.navigation.state.params.deck;
    const { title, cards } = deck;
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.deck}>{title}</Text>
          <Text style={styles.cards}t>{cards} cards</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.add} onPress={() =>
            this.props.navigation.navigate('AddCard', {deck: deck})}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quit} onPress={() =>
            this.props.navigation.navigate('Quiz', {deck: deck})}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    alignItems: 'center',
  },
  deck: {
    fontSize: 42,
  },
  cards: {
    fontSize: 20,
    color: 'gray',
  },
  add: {
    backgroundColor: 'cornflowerblue',
    borderRadius: 6,
    padding: 5,
    paddingLeft: 35,
    paddingRight: 35,
    margin: 10,
  },
  quit: {
    backgroundColor: 'cadetblue',
    borderRadius: 6,
    padding: 5,
    paddingLeft: 35,
    paddingRight: 35,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
  },
});
