import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  } from 'react-native';

export default class Decks extends React.Component {
  state = {
    decks: [
      { title: 'deck 1', cards: '3' },
      { title: 'deck 2', cards: '8' },
      { title: 'deck 3', cards: '23' },
    ],
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.decks.map((deck, i) => (
          <View style={styles.deckContainer} key={i}>
            <Text style={styles.deck}>{deck.title}</Text>
            <Text style={styles.cards}>cards {deck.cards}</Text>
          </View>))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  deckContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  deck: {
  },
  cards: {
  },
});
