import { combineReducers } from 'redux';
import nomeReducer1 from './reducer1';
// import nomeReducer2 from './nomeReducer2';

const rootReducer = combineReducers({
  nomeReducer1,
  // nomeReducer2,
});

export default rootReducer;
