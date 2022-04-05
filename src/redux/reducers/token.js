const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'UPDATE_TOKEN':
    return action.token;
  case 'USER_TOKEN':
    return action.payload;
  default:
    return state;
  }
};

export default token;
