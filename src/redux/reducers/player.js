import { USER_DATA } from '../actions';

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
  default:
    return state;
  }
};

export default player;
