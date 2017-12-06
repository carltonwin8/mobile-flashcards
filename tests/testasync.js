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
  saveDeckTitle(title) {
    helpers.saveDeckTitle(title).then(this.setState({title})).catch(e => alert(e));
  }
  addCardToDeck(title, question) {
    const q = { question: question, answer: question };
    helpers.addCardToDeck(title, q).catch(e => alert(e));
  }
  render = () => {
    const {text, title} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.clearDecks}>
          <Text>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.showDecks}>
          <Text>Show</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.saveDefaultDecks}>
          <Text>S dftls</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity onPress={() => this.saveDeckTitle(text)}>
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

const mapStateToProps = ({decks}) => ({decks});
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
