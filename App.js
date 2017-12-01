import React from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Decks from './components/decks/decks.js';
import AddDeck from './components/add-deck/add-deck.js';
import Deck from './components/deck/deck.js';
import AddCard from './components/add-card/add-card.js';
import Quiz from './components/quiz/quiz.js';
import TestAsync from './tests/testasync.js';
import reducers from './reducers';

function Statusbar({backgroundColor, ...props}) {
  return (<View style={{backgroundColor, height: Constants.statusBarHeight}} >
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>)
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: 'black',
    style: {
      backgroundColor: 'aqua',
    }
  }
});

const Navigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  Deck: {
    screen: Deck,
  },
  AddCard: {
    screen: AddCard,
  },
  Quiz: {
    screen: Quiz,
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{flex: 1}}>
          <Statusbar backgroundColor='aqua' barStyle='light-content' />
          <TestAsync />
          <Navigator />
        </View>
      </Provider>
    );
  }
}
