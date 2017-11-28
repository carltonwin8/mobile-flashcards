import React from 'react';
import {
  StatusBar,
  Text,
  View,
  } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Constants } from 'expo';

import Decks from './components/decks/decks.js';
import AddDeck from './components/add-deck/add-deck.js';
import Deck from './components/deck/deck.js';

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
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Statusbar backgroundColor='aqua' barStyle='light-content' />
        <Navigator />
      </View>
    );
  }
}
