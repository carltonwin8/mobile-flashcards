import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const FLASHCARD_STORAGE_KEY = 'mobile-flashcards:notifications';

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(data => {
    if(data) return JSON.parse(data); else return {};
  });
}

export function getDeck(id) {

}

export function saveDecks(decks) {
  return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks));
}

export function saveDeckTitle(title) {
  return new Promise(function(resolve, reject){
    if (!title || title.length === 0) return reject('Invalid Empty Title');
    getDecks().then(data => {
      const deck = {title: title, questions: []};
      if (!data || !data.dataSource) return resolve(saveDecks({ "dataSource" : [deck]}));
      const tmatch = data.dataSource.filter(d => d.title === title);
      if (tmatch.length !== 0) return reject('Title Already Used');
      return resolve(saveDecks({dataSource: data.dataSource.concat(deck)}));
    });
  });
}

export function addCardToDeck(title, question) {
  return new Promise(function(resolve, reject){
    if (!title || title.length === 0)
      return reject('Invalid. Empty Title');
    if (!question || question.length === 0)
      return reject('Invalid. No Question/Answer Provided');
    if (!question.question || question.question.length === 0)
      return reject('Invalid. No Question Provided');
    if (!question.answer || question.answer.length === 0)
      return reject('Invalid. No Answer Provided');
    getDecks().then(data => {
      if (!data || !data.dataSource) return reject("The deck is empty. Can't add the question.");
      let foundTitle = data.dataSource.filter(d => d.title === title);
      if (foundTitle.length === 0) return reject("Title not found. Can't add the question.");
      let rejected = false;
      const ds = data.dataSource.map(d => {
        if (d.title === title) {
          if (!d.questions) return {...d, questions: [question]};
          else {
            const q = d.questions.filter(q => q.question === question.question);
            if (q.length !== 0) { rejected = true; return d }
            else return {...d, questions: d.questions.concat(question)};
          }
        } else return d;
      });
      if (rejected) return reject('Invalid. Question already present');
      return resolve(saveDecks({dataSource: ds}));
    });
  });
}

export function removeDecks() {
  return AsyncStorage.removeItem(FLASHCARD_STORAGE_KEY);
}
