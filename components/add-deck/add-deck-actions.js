import { ADD_DECK, } from './actionTypes';

export function getDecks(title) { return { type: 'ADD_DECK', {title} } }
