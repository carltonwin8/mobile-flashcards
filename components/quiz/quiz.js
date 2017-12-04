import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  } from 'react-native';

export default class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { title: `Quiz For: ${navigation.state.params.deck.title}` };
  };

  state = {
    presentQuestion: 0,
    totalQuestions: 1,
    viewingQuestion: true,
    finishedQuestions: false,
    score: 0,
  }

  componentDidMount = () => {
    this.setState(s => ({...s, totalQuestions:
      this.props.navigation.state.params.deck.questions.length }))
}
  switchQnA = () => this.setState(s => ({...s, viewingQuestion: !s.viewingQuestion}));
  score = (val) => {
    this.setState(s => {
      let finished = false;
      let nextQuestion = s.presentQuestion;
      if (s.presentQuestion + 1 < s.totalQuestions ) nextQuestion += 1;
      else finished = true;
      return {...s,
        presentQuestion: nextQuestion,
        finishedQuestions: finished,
        score: s.score + val,
        viewingQuestion: true,
      };
    });
  }

  render = () => {
    const deck = this.props.navigation.state.params.deck;
    const { title, questions } = deck;
    const question = questions[this.state.presentQuestion];
    const { presentQuestion, totalQuestions, viewingQuestion, finishedQuestions, score } = this.state;
    return (
      <View style={styles.container}>
        <Text>Question: {presentQuestion + 1}/{totalQuestions}</Text>
        <View style={styles.q}>
          <Text style={styles.qtext}>
            { viewingQuestion ? question.question : question.answer }
          </Text>
          <TouchableOpacity style={styles.viewqa} onPress={this.switchQnA}>
            <Text style={styles.viewqatext}>
              View { viewingQuestion ? 'Answer' : 'Question' }
            </Text>
          </TouchableOpacity>
        </View>
        { finishedQuestions
            ? <Text>Quiz Finished</Text>
            : <View>
                <TouchableOpacity style={styles.correct} onPress={() => this.score(1)}>
                  <Text style={styles.buttonText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.incorrect} onPress={() => this.score(0)}>
                  <Text style={styles.buttonText}>Incorrect</Text>
                </TouchableOpacity>
              </View>
        }

        <Text>Score: {score}/{totalQuestions}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  q: {
    alignItems: 'center',
  },
  qtext: {
    fontSize: 20,
  },
  cards: {
    fontSize: 20,
    color: 'gray',
  },
  viewqatext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  },
  viewqa: {
    borderRadius: 6,
    padding: 5,
    paddingLeft: 35,
    paddingRight: 35,
    margin: 10,
  },
  correct: {
    backgroundColor: 'green',
    borderRadius: 6,
    padding: 5,
    paddingLeft: 35,
    paddingRight: 35,
    margin: 10,
  },
  incorrect: {
    backgroundColor: 'red',
    borderRadius: 6,
    padding: 5,
    paddingLeft: 35,
    paddingRight: 35,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
