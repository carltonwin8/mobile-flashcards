import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.deck.title}` };
  };
  quiz = () => {
    const decks = this.props.dataSource;
    const { title } = this.props.navigation.state.params.deck;
    const deck = decks.filter(d => d.title === title)[0];
    const { questions } = deck;
    if (questions && questions.length > 0)
      this.props.navigation.navigate('Quiz', {deck: deck});
    else alert("Can't run quiz due to no cards. Please a Add Card.")
  }
  render = () => {
    const { title } = this.props.navigation.state.params.deck;
    const deck = this.props.dataSource.filter(d => d.title === title);
    const { questions } = deck[0];
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.deck}>{title}</Text>
          <Text style={styles.cards}>{questions ? questions.length : 0} cards</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.add} onPress={() =>
            this.props.navigation.navigate('AddCard', {title: title})}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quit} onPress={this.quiz}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({dataSource}) => ({dataSource});
export default connect(mapStateToProps)(Deck);

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
