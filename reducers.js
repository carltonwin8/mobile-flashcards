import { ADD_DECK } from './components/add-deck/add-deck-actionTypes';
import { ADD_DECKS, CLEAR_DECKS } from './components/decks/decks-actionTypes';
import { ADD_CARD } from './components/add-card/add-card-actionTypes';

const initialState = { dataSource: [ ], };

export default function entries(state=initialState, action) {
  switch (action.type) {
    case CLEAR_DECKS: return initialState;
    case ADD_DECK:
      const deck = {title: action.title, questons: []};
      const ds = state.dataSource ? state.dataSource.concat(deck) : [deck];
      return {...state, dataSource: ds}
    case ADD_DECKS:
      const ds1 = (action.decks && action.decks.dataSource)
        ? action.decks.dataSource
        : [];
      return {...state, dataSource: ds1}
    case ADD_CARD:
      const dataSource = state.dataSource.map(deck => {
        debugger;
        if (deck.title !== action.title) return deck;
        return {...deck, questions : deck.questions.concat(action.card)};
      });
      return {...state, dataSource: dataSource }
    default: return state;
  }
}
