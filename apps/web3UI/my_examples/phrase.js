const {
  Wallet,
  randomBytes,
  Mnemonic,
  HDNodeWalle,
  utils
} = require('ethers');

const myRandomBytes = randomBytes(32);
const mnemonic = Mnemonic.fromEntropy(myRandomBytes)
const wallet = Wallet.fromPhrase(mnemonic.phrase);

console.log('Mnemonic Phrase:', mnemonic.phrase);
console.log('Wallet Address:', wallet.address);
console.log('Wallet Private Key:', wallet.privateKey);

/*
const mnemonicPhrase = utils.entropyToMnemonic(randomBytes);
const wallet = Wallet.fromMnemonic(mnemonicPhrase);

console.log('Mnemonic Phrase:', mnemonicPhrase);
console.log('Wallet Address:', wallet.address);
console.log('Wallet Private Key:', wallet.privateKey);
*/
