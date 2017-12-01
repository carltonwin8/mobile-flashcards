import { GET_DECKS } from './actionTypes';

export default function entries(state={}, action) {
  switch (action.type) {
    case GET_DECKS: return state;
    default: return state;
  }
}
