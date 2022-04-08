const switchCategory = (category) => {
  switch (category) {
  case 'Conhecimentos gerais':
    return '&category=9';
  case 'Entretenimento: livros':
    return '&category=10';
  case 'Entretenimento: filmes':
    return '&category=11';
  case 'Entretenimento: musicas':
    return '&category=12';
  case 'Entretenimento: musicais e teatro':
    return '&category=13';
  default:
    return '';
  }
};

const switchDifficulty = (category) => {
  switch (category) {
  case 'Fácil':
    return '&difficulty=easy';
  case 'Médio':
    return '&difficulty=medium';
  case 'Difícil':
    return '&difficulty=hard';
  default:
    return '';
  }
};

const switchType = (type) => {
  switch (type) {
  case 'Múltipla escolha':
    return '&type=multiple';
  case 'verdadeiro/falso':
    return '&type=boolean';
  default:
    return '';
  }
};

const urlGenerator = (token, configs) => {
  const {
    category,
    difficulty,
    type,
  } = configs;

  console.log('------------------');
  console.log('configs', configs);
  console.log(category);
  console.log(difficulty);
  console.log(type);
  console.log('------------------');

  const categoryURL = switchCategory(category);
  const difficultyURL = switchDifficulty(difficulty);
  const typeURL = switchType(type);

  if (configs === 'inicial-state') {
    return `https://opentdb.com/api.php?amount=5&token=${token}`;
  }

  console.log(`https://opentdb.com/api.php?amount=5${categoryURL}${difficultyURL}${typeURL}&token=${token}`);
  return `https://opentdb.com/api.php?amount=5&token=${token}${categoryURL}${difficultyURL}${typeURL}`;
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
