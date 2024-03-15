const crypto = require('crypto');
const seedHexJson = require('../seedHex.json');
//import EthjsWallet, { hdkey as etherHDkey } from 'ethereumjs-wallet';
const EthjsWallet = require('ethereumjs-wallet');
require('dotenv/config');

//const seedHexJson = {
//    "iv": "8cc12951fcda82955761c278044a4e29",
//    "encryptedData": "83331703cc8c90813251ea2ae825aad6a731340341a88a945635fb065e62616ef54d804438d10f21ca0fcee424e6ffd5e916e80fa57dd255f0c8d97441cdfa5a1014753f8f45bb12d00d026e609ecc86dcd56f116e29b81eecd898dabd845ecff7ddae9bd285ea9b93cdb1d81fc5a9161326192859ad327599e2edb11e05cdb8bf03840268e703f2ba4bd1effdf10b95"
//}

const env_key = Buffer.from(process.env.KEY, 'hex');
//const env_iv = Buffer.from(process.env.IV, 'hex');

const decrypt = (text, key) => {
  let iv = Buffer.from(text.iv, 'hex');
  //let iv = Buffer.from(env_iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
//console.log(key, text.iv)
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString('utf8');
}

const getPkey = (seedHex) => {
  const HDwallet = EthjsWallet.hdkey.fromMasterSeed(seedHex);
  const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
  return zeroWallet.getPrivateKeyString();
}

/*
console.log(
  'key',
  env_key.toString('hex'),
//  'iv',
//  env_iv.toString('hex'),
);
*/

const seedHex = decrypt(seedHexJson, env_key);
const pkey = getPkey(seedHex);

console.log(
  'decrypt seedHex:',
  //decrypt(seedHexJson, env_key),
  seedHex,
  '\npkey: ', pkey,
);

