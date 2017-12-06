import { ADD_DECK } from './add-deck-action-types';
import { addDecks } from '../decks/decks-actions';
import * as helpers from '../../utils/helpers';

export function addDeckState(title) { return { type: 'ADD_DECK', title: title } }
export function addDeck(title) {
  return (dispatch, getState) => {
    const deck = {title: title, questions: []};
    const {decks} = getState();
    const d = {"decks" : !decks ? [deck] : decks.concat(deck)};
    helpers.saveDeckTitle(d)
      .then (() => dispatch(addDecks(d.decks)))
      .catch(e => console.log("Saving deck title failed!", e));
  }
}
