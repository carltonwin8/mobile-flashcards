import { ADD_DECKS, CLEAR_DECKS } from './decks-actionTypes';

export function addDecks(decks) { return { type: 'ADD_DECKS', decks: decks } }
export function clearDecks() { return { type: 'ADD_DECKS' } }
