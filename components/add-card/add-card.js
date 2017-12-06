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

import * as addCardActions from './add-card-actions';

class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
  }
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return { title: `Add Card To Deck: ${title}` };
  }
  submit = () => {
    const { question, answer } = this.state;
    if (!question || question.length === 0 || !answer || answer.length === 0)
      return alert('Invalid. Enter a Question And an Answer.');
    const { decks } = this.props;
    const { title } = this.props.navigation.state.params;
    let questionAlreadyPresent = false;
    decks.map(d => {
      if (d.title === title) {
        if (d.questions) {
          const q = d.questions.filter(q => q.question === question);
          if (q.length !== 0) questionAlreadyPresent = true;
        }
      }
    });
    if (questionAlreadyPresent) return alert('Invalid. Question already present');
    this.props.addCard(title, question, answer);
    this.props.navigation.goBack();
  }

  render = () => {
    const { question, answer } = this.state;
    return (<KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.vInput}>
        <TextInput
          placeholder='Question'
          style={styles.input}
          value={question}
        onChangeText={q => this.setState(s => ({...s, question : q}))}
        />
      </View>
      <View style={styles.vInput}>
        <TextInput
          placeholder='Response'
          style={styles.input}
          value={answer}
          onChangeText={a => this.setState(s => ({...s, answer: a}))}
        />
      </View>
      <TouchableOpacity onPress={this.submit} style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>);
  }
}

const mapStateToProps = ({decks}) => ({decks});
export default connect(mapStateToProps,{...addCardActions})(AddCard);

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
