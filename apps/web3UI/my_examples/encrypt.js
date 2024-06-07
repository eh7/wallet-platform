const crypto = require('crypto');
const seedHexJson = require('../seedHex.json');
require('dotenv/config');

//const key = crypto.randomBytes(32);
//const iv = crypto.randomBytes(16);
const key = Buffer.from(process.env.KEY, 'hex');
const iv = Buffer.from(process.env.IV, 'hex');
const text = "this is some test text";

const encrypt = (_text) => {
  let cipher = crypto.createCipheriv(
    'aes-256-cbc',
    key,
    iv
  );
  let encrypted = cipher.update(_text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
}

const decrypt = (text) => {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString('utf8');
}

const encrypted_text = encrypt(text);
const decrypted_text = decrypt(encrypted_text);

console.log(
  encrypted_text,
  decrypted_text,
  (text === decrypted_text)
);

/*
const env_key = process.env.KEY;
const env_iv = process.env.IV;

const decrypt = (text, key) => {
  //let iv = Buffer.from(text.iv, 'hex');
  let iv = Buffer.from(env_iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
console.log(key, text.iv)
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  //let decrypted = decipher.update(encryptedText);
  //decrypted = Buffer.concat([decrypted, decipher.final()]);
  //return decrypted.toString('utf8');
}

console.log(
  'key',
  env_key.toString('hex'),
  'iv',
  env_iv.toString('hex'),
);

console.log(
  'decrypt seedHex:',
  decrypt(seedHexJson, env_key),
);
*/

/*
const bip39 = require('bip39-light');

getPhrase = async () => {
  const phrase = await bip39.generateMnemonic();
  console.log('');
  console.log(phrase);
}
getPhrase()
*/
