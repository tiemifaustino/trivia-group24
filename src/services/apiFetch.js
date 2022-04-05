const urlGenerator = (token) => `https://opentdb.com/api.php?amount=5&token=${token}`;

const apiQuestionsFetch = async (token) => {
  const METHOD = { method: 'GET' };
  const response = await fetch(urlGenerator(token), METHOD);
  const data = await response.json();
  const { response_code: responseCode, results } = data;

  if (responseCode === 0) return { results, newToken: token };

  const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const newTokenResponse = await fetch(URL_TOKEN, METHOD);
  const newTokenData = await newTokenResponse.json();
  
  const newResponse = await fetch(urlGenerator(newTokenData.token), METHOD);
  const newData = await newResponse.json();
  return { results: newData.results, newToken: newTokenData.token };
};

export default apiQuestionsFetch;
