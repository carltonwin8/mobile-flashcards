import React from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Decks from './components/decks/decks';
import AddDeck from './components/add-deck/add-deck';
import Deck from './components/deck/deck';
import AddCard from './components/add-card/add-card';
import Quiz from './components/quiz/quiz';
import reducers from './reducers';

import TestAsync from './tests/testasync';
import TestPush from './tests/testpush';
import * as helpers from './utils/helpers';

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

const middleware = applyMiddleware(thunk); // , createLogger()); // logger used during debug
const store = createStore(reducers, middleware);

export default class App extends React.Component {
  componentDidMount = () => helpers.setLocalNotification();
  render = () => {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <Statusbar backgroundColor='aqua' barStyle='light-content' />
          {/*TestAsync />*/}
          {/*<TestPush />*/}
          <Navigator />
        </View>
      </Provider>
    );
  }
}
