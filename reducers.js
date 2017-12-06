import { ADD_DECKS, CLEAR_DECKS } from './components/decks/decks-action-types';
import { ADD_DECK } from './components/add-deck/add-deck-action-types';
import { ADD_CARD } from './components/add-card/add-card-action-types';

export default function decks(state={}, action) {
  switch (action.type) {
    case CLEAR_DECKS: return {}
    case ADD_DECKS: return {...state, decks: action.decks ? action.decks : []}
    case ADD_DECK:
      const deck = {title: action.title, questons: []};
      const ds = state.decks ? state.decks.concat(deck) : [deck];
      return {...state, decks: ds}
    case ADD_CARD:
      const ds3 = state.decks.map(deck => {
        if (deck.title !== action.title) return deck;
        const questions = deck.questions.concat(action.card);
        return {...deck, questions : questions};
      });
      return {...state, decks: ds3 };
    default: return state;
  }
}
