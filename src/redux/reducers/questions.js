import { REQ_FAILURE, UPDATE_QUESTIONS, SAVE_CONFIGS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  error: null,
  configs: 'inicial-state',
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_QUESTIONS:
    return { ...state, questions: action.questions };
  case REQ_FAILURE:
    return { ...state, error: action.error };
  case SAVE_CONFIGS:
    return { ...state, configs: action.configs };
  default:
    return state;
  }
};

export default questions;
