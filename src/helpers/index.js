export const correctAnswerClass = 'correct-answer';

export const randomNumber = () => {
  const possibilities = 100000000000;
  return Math.random() * possibilities;
};

export const sorter = (a, b) => {
  const minusOne = -1;
  if (a.position > b.position) {
    return 1;
  }
  if (a.position < b.position) {
    return minusOne;
  }
  return 0;
};

export const INITIAL_STATE = {
  qIndex: 0,
  timer: 30,
  isTimerOut: false,
  positions: {},
  nextVisible: false,
};
