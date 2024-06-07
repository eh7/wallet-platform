const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

const key = randomBytes(32);
const iv = randomBytes(16);

console.log(
  'key',
  key.toString('hex'),
  'iv',
  iv.toString('hex'),
);


const bip39 = require('bip39-light');

getPhrase = async () => {
  const phrase = await bip39.generateMnemonic();
  console.log('');
  console.log(phrase);
}
getPhrase()
