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
    question: "",
    answer: "",
  }
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return { title: `Add Card To Deck: ${title}` };
  }
  submit = () => {
    const { title } = this.props.navigation.state.params;
    if (!title || title.length === 0) alert ('Invalid. Empty Title');
    const { question, answer } = this.state;
    if (!question || question.length === 0) alert('Invalid. No Question Provided');
    if (!answer || answer.length === 0) alert('Invalid. No Answer Provided');
    const { dataSource } = this.props;
    if (!dataSource) alert ("The deck is empty. Can't add the question.");
    let foundTitle = dataSource.filter(d => d.title === title);
    if (foundTitle.length === 0) alert ("Title not found. Can't add the question.");
    const ds = dataSource.map(d => {
      if (d.title === title) {
        if (!d.questions) return {...d, questions: [question]};
        else {
          const q = d.questions.filter(q => q.question === question.question);
          if (q.length !== 0) alert('Invalid. Question already present');
          else return {...d, questions: d.questions.concat(question)};
        }
      } else return d;
    });
    const card = {question: question, answer: answer};
    this.props.addCard(title,card,helpers.addCardToDeck);
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

const mapStateToProps = ({dataSource}) => ({dataSource});
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
