import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import * as helpers from '../utils/helpers';
import * as decksActions from '../components/decks/decks-actions';

/**
 * UI for interactively developing/testing the async deck storage/retrival.
 * Not used in the released application.
 */
class TestAsync extends React.Component {
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
    helpers.saveDecks(data);
  }
  getData() { helpers.getDecks().then(data => {console.log(data); }) }
  saveDeckTitle(title) {
    helpers.saveDeckTitle(title).then(this.setState({title})).catch(e => alert(e));
  }
  addCardToDeck(title, question) {
    const q = { question: question, answer: question };
    helpers.addCardToDeck(title, q).catch(e => alert(e));
  }
  removeDeck = () => helpers.removeDecks().then(this.props.clearDecks);
  render = () => {
    const {text, title} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.removeDeck}>
          <Text>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getData}>
          <Text>G All</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={this.saveData}>
          <Text>S All</Text>
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
        </View> */}
      </View>
    );
  }
}

const mapStateToProps = ({dataSource}) => ({dataSource});
export default connect(mapStateToProps, {...decksActions})(TestAsync);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vInput: {
    width: 200,
  },
});
