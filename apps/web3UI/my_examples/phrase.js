const {
  Wallet,
  randomBytes,
  Mnemonic,
  HDNodeWallet,
  utils
} = require('ethers');

const myRandomBytes = randomBytes(32);
const mnemonic = Mnemonic.fromEntropy(myRandomBytes)
const wallet = Wallet.fromPhrase(mnemonic.phrase);

console.log('Mnemonic Phrase:', mnemonic.phrase);
console.log('Wallet Address:', wallet.address);
console.log('Wallet Private Key:', wallet.privateKey);

//const hdWalletNode = HDNodeWallet.fromPhrase(mnemonic.phrase);
//const hdWallet0 = hdWalletNode.derivePath("m/44'/60'/0'/0/0");
//const hdWallet1 = hdWalletNode.derivePath("m/44'/60'/0'/0/1");

for(let i=0; i<10; i++) {
  const path = "m/44'/60'/0'/0/" + i
  const mnemonicInstance = Mnemonic.fromPhrase(mnemonic.phrase)
  const hdWallet = HDNodeWallet.fromMnemonic(mnemonicInstance, path)
  console.log('HDWallet '  + i + ' Address:', hdWallet.address);
}

/*
const mnemonicPhrase = utils.entropyToMnemonic(randomBytes);
const wallet = Wallet.fromMnemonic(mnemonicPhrase);

console.log('Mnemonic Phrase:', mnemonicPhrase);
console.log('Wallet Address:', wallet.address);
console.log('Wallet Private Key:', wallet.privateKey);
*/
