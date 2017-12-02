import { ADD_DECK } from './components/add-deck/add-deck-actionTypes';
import { ADD_DECKS, CLEAR_DECKS } from './components/decks/decks-actionTypes';
import { ADD_CARD } from './components/add-card/add-card-actionTypes';

const initialState = { dataSource: [ ], };

export default function entries(state=initialState, action) {
  switch (action.type) {
    case CLEAR_DECKS: return initialState;
    case ADD_DECK: return {...state,
      dataSource: state.dataSource.concat({title: action.title, questions: []})}
    case ADD_DECKS: return {...state, dataSource: action.decks.dataSource}
    case ADD_CARD:
      console.log(action.card);
      console.log(action.title);
      console.log(state.dataSource);
      const dataSource = state.dataSource.map(deck => deck.title == action.title ?
          {...deck, questions : deck.questions.concat(action.card) } : deck);
      console.log(dataSource);
      return {...state,
        dataSource: state.dataSource.map(deck => deck.title == action.title ?
          deck.questions.concat(action.card) : deck) }
    default: return state;
  }
}
