// export const minhaAction = (value) => ({ type: USER_LOGIN, value });
const USER_TOKEN = 'USER_TOKEN';

const saveToken = (payload) => ({ type: USER_TOKEN, payload });

export default saveToken;
