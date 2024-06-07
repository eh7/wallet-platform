const bip39 = require('bip39-light');

getPhrase = async () => {
  const phrase = await bip39.generateMnemonic();
  console.log('');
  console.log(phrase);
}
getPhrase()
