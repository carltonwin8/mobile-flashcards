import { ADD_CARD } from "./add-card-action-types";
import { addDecks } from "../decks/decks-actions";
import * as helpers from "../../utils/helpers";

export function addCardState(title, card, store) {
  return { type: "ADD_CARD", title: title, card: card, store: store };
}
export function addCard(title, question, answer) {
  return (dispatch, getState) => {
    const card = { question: question, answer: answer };
    const d = getState().decks.map(d => {
      if (d.title === title) {
        if (!d.questions) return { ...d, questions: [card] };
        else return { ...d, questions: d.questions.concat(card) };
      } else return d;
    });
    helpers
      .addCardToDeck({ decks: d })
      .then(() => dispatch(addDecks(d)))
      .catch(e => console.log("Saving a card failed!", e));
  };
}
