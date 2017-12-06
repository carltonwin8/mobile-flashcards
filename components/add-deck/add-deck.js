import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import * as helpers from '../../utils/helpers';
import * as addDeckActions from './add-deck-actions';

class AddDeck extends React.Component {
  state = {
    title: "",
  }
  addDeck = () => {
    const { title } = this.state;
    if (!title || title.length === 0) return alert ('Invalid. Empty deck title.');
    const { decks } = this.props;
    if (decks && decks.length > 0) {
      const tmatch = decks.filter(d => d.title === title);
      if (tmatch.length !== 0) return alert ('Deck title already used.');
    }
    this.props.addDeck(title);
    this.props.navigation.goBack();
  }
  render = () => {
    return (<KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.question}>What is the title of your new deck?</Text>
      <View style={styles.vInput}>
        <TextInput
          placeholder='Deck Title'
          style={styles.input}
          value={this.title}
          onChangeText={title => this.setState({title})}
        />
      </View>
      <TouchableOpacity onPress={this.addDeck} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>);
  }
}

const mapStateToProps = ({decks}) => ({decks});
export default connect(mapStateToProps,{...addDeckActions})(AddDeck);

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
    backgroundColor: 'black',
    borderRadius: 6,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
