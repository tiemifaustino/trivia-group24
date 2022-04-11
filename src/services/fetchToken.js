const tokenURl = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(tokenURl, { method: 'GET' });
  const json = await response.json();
  return json;
};

export default getToken;
