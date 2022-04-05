const INITIAL_STATE = 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'UPDATE_TOKEN': {
    console.log('reducer action', action);
    return action.token; }
  case 'USER_TOKEN':
    return action.payload;
  default:
    return state;
  }
};

export default token;
