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
      console.log('add card');
      const ds3 = state.dataSource.map(deck => {
        if (deck.title !== action.title) return deck;
        console.log(deck);
        console.log(action);
        debugger;
        const questions = deck.questions.concat(action.card);
        console.log(questions);
        return {...deck, questions : questions};
      });
      console.log(ds3);
      return {...state, dataSource: ds3 }
    default: return state;
  }
}
