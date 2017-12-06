import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const FLASHCARD_STORAGE_KEY = 'mobile-flashcards:storage';
const NOTIFICATION_KEY = 'mobile-flashcards:notifications';

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

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: 'Take A Quiz',
    body: "Don't forget to do a deck quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
 AsyncStorage.getItem(NOTIFICATION_KEY)
   .then(JSON.parse)
   .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);
              // tomorrow.setSeconds(tomorrow.getSeconds() + 10) // used during debug
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                { time: tomorrow, repeat: 'day' }
              );
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }})
}
