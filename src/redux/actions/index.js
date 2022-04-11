import apiQuestionsFetch from '../../services/apiFetch';
import getToken from '../../services/fetchToken';

// Action Types
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const REQ_FAILURE = 'REQ_FAILURE';
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';
export const REQUIRE = 'REQUIRE';
export const USER_TOKEN = 'USER_TOKEN';
export const USER_DATA = 'USER_DATA';
export const SCORE_UPDATE = 'SCORE_UPDATE';
export const NEW_GAME = 'NEW_GAME';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';

// Actions

export const saveToken = (payload) => ({
  type: USER_TOKEN,
  payload,
});

export const savePlayer = (payload) => ({
  type: USER_DATA,
  payload,
});

export const updateToken = (token) => ({
  type: UPDATE_TOKEN,
  token,
});

export const apiOnFailure = (error) => ({
  type: REQ_FAILURE,
  error,
});

export const updateQuestions = (questions) => ({
  type: UPDATE_QUESTIONS,
  questions,
});

export const updateScore = (score, assertion) => ({
  type: SCORE_UPDATE,
  score,
  assertion,
});

export const newGame = () => ({ type: NEW_GAME });

export const saveSettings = (settings) => ({
  type: SAVE_SETTINGS,
  settings,
});

// Thunk Functions

export const getSaveToken = () => async (dispatch) => {
  try {
    const newReq = await getToken();
    dispatch(saveToken(newReq.token));
  } catch (error) {
    dispatch(apiOnFailure(error));
  }
};

export const getQuestions = (token, settings) => async (dispatch) => {
  try {
    const newReq = await apiQuestionsFetch(token, settings);
    dispatch(updateQuestions(newReq.results));
    dispatch(updateToken(newReq.newToken));
  } catch (error) {
    dispatch(apiOnFailure(error));
  }
};
