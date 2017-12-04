import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const FLASHCARD_STORAGE_KEY = 'mobile-flashcards:notifications';

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse);
}

export function getDeck(id) {

}

export function saveDecks(decks) {
  return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks));
}

export function saveDeckTitle(data) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
}

export function addCardToDeck(data) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
}

export function removeDecks() {
  return AsyncStorage.removeItem(FLASHCARD_STORAGE_KEY);
}
