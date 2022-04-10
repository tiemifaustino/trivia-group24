import { REQ_FAILURE, SAVE_SETTINGS, UPDATE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  error: null,
  settings: {
    category: 'any',
    difficulty: 'any',
    questionType: 'any',
  }
  ,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_QUESTIONS:
    return { ...state, questions: action.questions };
  case REQ_FAILURE:
    return { ...state, error: action.error };
  case SAVE_SETTINGS:
    return { ...state, settings: action.settings };
  default:
    return state;
  }
};

export default questions;
