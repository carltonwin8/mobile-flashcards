import { ADD_CARD, } from './add-card-actionTypes';

export function addCard(title, card, store) {
  return { type: 'ADD_CARD', title: title, card: card, store: store }
}
