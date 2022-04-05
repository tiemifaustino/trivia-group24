import { REQ_FAILURE, UPDATE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  error: null,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_QUESTIONS:
    return { ...state, questions: action.questions };
  case REQ_FAILURE:
    return { ...state, error: action.error };
  default:
    return state;
  }
};

export default questions;
