import { ADD_DECKS, CLEAR_DECKS } from './decks-action-types';
import * as helpers from '../../utils/helpers';

export function addDecks(decks) { return { type: 'ADD_DECKS', decks } }
export function getDecks() {
  return (dispatch, getState) => {
    helpers.getDecks()
      .then(data => data && data.decks && dispatch(addDecks(data.decks)))
      .catch(e => console.log("getting decks failed!", e));
  }
}

export function clearDecksState() { return { type: 'CLEAR_DECKS' } }
export function clearDecks() {
  return (dispatch, getState) => {
    helpers.removeDecks().then(() => dispatch(clearDecksState()))
      .catch(e => console.log("clearing decks failed!", e));
  }
}

/*
 * functions below used for debugging
 */

/* show state on local storage and redux */
export function showDecks() {
  return (dispatch, getState) => {
    helpers.getDecks().then(data => {
        console.log(data);
        console.log(getState());
      })
      .catch(e => console.log("getting decks failed!", e));
  }
}

/* save a defaulf local storage data */
export function saveDefaultDecks() {
  const questions = [{
    question: 'What is React?',
    answer: 'A library for managing user interfaces'
  }, {
    question: 'Where do you make Ajax requests in React?',
    answer: 'The componentDidMount lifecycle event'
  }];
  const data = { decks: [
      { title: 'deck 1', cards: '3', questions: questions },
      { title: 'deck 2', cards: '8', questions: questions },
  ]};
  return (dispatch, getState) => {
    helpers.saveDecks(data).then(() => console.log(data))
      .catch(e => console.log("getting decks failed!", e));
  }

}
