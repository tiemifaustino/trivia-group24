import apiQuestionsFetch from '../../services/apiFetch';
import getToken from '../../services/fetchToken';

// Action Types
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const REQ_FAILURE = 'REQ_FAILURE';
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';
export const REQUIRE = 'REQUIRE';
export const USER_TOKEN = 'USER_TOKEN';
export const USER_DATA = 'USER_DATA';

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

// Thunk Functions

export const getSaveToken = () => async (dispatch) => {
  try {
    const newReq = await getToken();
    dispatch(saveToken(newReq.token));
  } catch (error) {
    dispatch(apiOnFailure(error));
  }
};

export const getQuestions = (token) => async (dispatch) => {
  try {
    const newReq = await apiQuestionsFetch(token);
    console.log('all', newReq);
    console.log('new results', newReq.results);
    dispatch(updateQuestions(newReq.results));
    console.log('new token', newReq.newToken);
    dispatch(updateToken(newReq.newToken));
  } catch (error) {
    dispatch(apiOnFailure(error));
  }
};
