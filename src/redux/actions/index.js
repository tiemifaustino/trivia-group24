import apiQuestionsFetch from '../../services/apiFetch';

// Action Types
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const REQ_FAILURE = 'REQ_FAILURE';
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';
export const REQUIRE = 'REQUIRE';
export const USER_TOKEN = 'USER_TOKEN';

// Actions

export const saveToken = (payload) => ({ type: USER_TOKEN, payload });

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

export const getQuestions = (token) => async (dispatch) => {
  try {
    const newReq = await apiQuestionsFetch(token);
    dispatch(updateQuestions(newReq.results));
    dispatch(updateToken(newReq.newToken));
  } catch (error) {
    dispatch(apiOnFailure(error));
  }
};
