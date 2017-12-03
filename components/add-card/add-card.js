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
import * as addCardActions from './add-card-actions';

class AddCard extends React.Component {
  state = {
    title: "",
    card: {
    question: "",
      answer: "",
    }
  }
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return { title: `Add Card To Deck: ${title}` };
  }
  submit = () => {
    const { title, card } = this.state;
    helpers.addCardToDeck(title, card).then(() => {
      this.props.addCard(title, card);
      this.props.navigation.goBack();
    }).catch (e => alert(e));
  }
  componentDidMount = () => this.setState(s =>
    ({...s, title: this.props.navigation.state.params.title}));

  render = () => {
    const { question, answer } = this.state.card;
    return (<KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.vInput}>
        <TextInput
          placeholder='Question'
          style={styles.input}
          value={question}
          onChangeText={question => this.setState(s =>
            ({...s, card: {question : question, answer: s.card.answer}}))}
        />
      </View>
      <View style={styles.vInput}>
        <TextInput
          placeholder='Response'
          style={styles.input}
          value={answer}
          onChangeText={answer => this.setState(s =>
            ({...s, card: {question: s.card.question, answer: answer}}))}
        />
      </View>
      <TouchableOpacity onPress={this.submit} style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>);
  }
}

export default connect(null,{...addCardActions})(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
