const urlGenerator = (token, configs) => {
  console.log(configs);
  const teste = {};
  if (configs === teste) {
    console.log(`https://opentdb.com/api.php?amount=5&token=${token}`);
    return `https://opentdb.com/api.php?amount=5&token=${token}`;
  }
};

const apiQuestionsFetch = async (token, configs) => {
  const METHOD = { method: 'GET' };
  const response = await fetch(urlGenerator(token, configs), METHOD);
  const data = await response.json();
  const { response_code: responseCode, results } = data;

  if (responseCode === 0) return { results, newToken: token };

  const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const newTokenResponse = await fetch(URL_TOKEN, METHOD);
  const newTokenData = await newTokenResponse.json();

  const newResponse = await fetch(urlGenerator(newTokenData.token, configs), METHOD);
  const newData = await newResponse.json();
  return { results: newData.results, newToken: newTokenData.token };
};

export default apiQuestionsFetch;
