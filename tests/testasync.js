import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  addCardToDeck,
  getDeck,
  getDecks,
  removeDecks,
  saveDecks,
  saveDeckTitle,
} from '../utils/helpers';

/**
 * UI for interactively developing/testing the async deck storage/retrival.
 * Not used in the released application.
 */
export default class TestAsync extends React.Component {
  state = {
    text: null,
    title: null,
  }
  saveData() {
    const questions = [{
      question: 'What is React?',
      answer: 'A library for managing user interfaces'
    }, {
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event'
    }];
    const data = {
      dataSource: [
        { title: 'deck 1', cards: '3', questions: questions },
        { title: 'deck 2', cards: '8', questions: questions },
      ],
    }
    saveDecks(data);
  }
  getData() {
    getDecks().then(data => {console.log(data); });
  }
  saveDeckTitle(title) {
    saveDeckTitle(title).then(this.setState({title})).catch(e => alert(e));
  }
  addCardToDeck(title, question) {
    const q = { question: question, answer: question };
    addCardToDeck(title, q).catch(e => alert(e));
  }
  removeDeck() {
    removeDecks();
  }
  render() {
    const {text, title} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.removeDeck}>
          <Text>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.saveData}>
          <Text>S All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getData}>
          <Text>G All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.saveDeckTitle(text)}>
          <Text>S Title</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.addCardToDeck(title, text)}>
          <Text>S Card</Text>
        </TouchableOpacity>
        <View style={styles.vInput}>
          <TextInput
            placeholder='Response'
            style={styles.input}
            value={this.state.text || ""}
            onChangeText={text => this.setState({text})}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vInput: {
    width: 200,
  },
});
