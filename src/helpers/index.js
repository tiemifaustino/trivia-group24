const symbolReplacer = (string) => {
  let newString = string.replace(/&quot;/g, '"');
  newString = string.replace(/&#39;/g, /'/);
  return newString;
};

export default symbolReplacer;
