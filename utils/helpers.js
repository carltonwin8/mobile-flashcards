import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const FLASHCARD_STORAGE_KEY = 'mobile-flashcards:notifications';

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse)
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
      if (data == null) {
        AsyncStorage.setItem(FLASHCARD_STORAGE_KEY,
          JSON.stringify({ "dataSource" : [{title}]}));
        return resolve();
      }
      if(data.dataSource.filter(d => d.title === title).length !== 0)
        return reject('Title Already Used');
      data.dataSource.push({title});
      return saveDecks(data);
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
      if (data == null) return reject("The deck is empty. Can't add the question.");
      if(data.dataSource.filter(d => d.title === title).length === 0)
        return reject("Title not found. Can't add the question.");
      data.dataSource.map(d => {
        if (d.title === title) {
          if (!d.questions) d.questions = [{...question}];
          else {
            console.log(d.questions.filter(q => q.question === question.question).length);
            if (d.questions.filter(q => {
              console.log(`${q.question} ${question.question} ${q.question === question.question}`);
              return q.question === question.question
            }).length !== 0)
              return reject('Invalid. Question already present');
            d.questions.push({...question});
          }
        }
      });
      return saveDecks(data);
    });
  });
}

export function removeDecks() {
  return AsyncStorage.removeItem(FLASHCARD_STORAGE_KEY);
}
