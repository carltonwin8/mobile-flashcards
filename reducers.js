const questions = [{
  question: 'What is React?',
  answer: 'A library for managing user interfaces'
}, {
  question: 'Where do you make Ajax requests in React?',
  answer: 'The componentDidMount lifecycle event'
}];
const initialState = {
  dataSource: [
    { title: 'deck 1', cards: '3', questions: questions },
    { title: 'deck 2', cards: '8', questions: questions },
  ],
};

export default function entries(state=initialState, action) {
  switch (action.type) {
    default: return state;
  }
}
