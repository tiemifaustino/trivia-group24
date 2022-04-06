import { SCORE_UPDATE, USER_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  email: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_DATA:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case SCORE_UPDATE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + action.assertion,
    };
  default:
    return state;
  }
};

export default player;
