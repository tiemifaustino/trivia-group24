const urlGenerator = (token, settings) => {
  const {
    category,
    difficulty,
    questionType,
  } = settings;

  const categoryURL = category !== 'any' ? `&category=${category}` : '';
  const difficultyURL = difficulty !== 'any' ? `&difficulty=${difficulty}` : '';
  const typeURL = questionType !== 'any' ? `&type=${questionType}` : '';

  return `https://opentdb.com/api.php?amount=5&token=${token}${categoryURL}${difficultyURL}${typeURL}`;
};

const apiQuestionsFetch = async (token, settings) => {
  const METHOD = { method: 'GET' };
  const response = await fetch(urlGenerator(token, settings), METHOD);
  const data = await response.json();
  const { response_code: responseCode, results } = data;

  if (responseCode === 0) return { results, newToken: token };

  const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const newTokenResponse = await fetch(URL_TOKEN, METHOD);
  const newTokenData = await newTokenResponse.json();

  const newResponse = await fetch(urlGenerator(newTokenData.token, settings), METHOD);
  const newData = await newResponse.json();

  const { response_code: newResponseCode, results: newResults } = newData;
  const voidResponse = 4;

  if (newResponseCode === voidResponse || newResponseCode === 1) {
    const voidMsg = 'There are no questions corresponding to the selected settings.';
    const voidMsg2 = 'Please reconfigure the game settings.';
    return {
      results: [`${voidMsg} ${voidMsg2}`],
      newToken: newTokenData.token,
    };
  }

  return { results: newResults, newToken: newTokenData.token };
};

export default apiQuestionsFetch;
