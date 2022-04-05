const apiQuestionsFetch = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const METHOD = { method: 'GET' };
  const response = await fetch(URL, METHOD);
  const data = await response.json();
  const { response_code: responseCode } = data;

  if (responseCode === 0) return data;
  const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const newResponse = await fetch(URL_TOKEN, METHOD);
  const newData = await newResponse.json();
  return newData;
};

export default apiQuestionsFetch;
