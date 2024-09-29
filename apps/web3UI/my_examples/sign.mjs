/*
const network = JSON.parse(localStorage.getItem("network"));
const provider = this.networkProvider[network.chainId];
const privateKeyString = await this.getPrivateKey();
const signer = new EthersWallet(privateKeyString, provider);
const rawSig = await signer.signMessage(_message);
//const recovered = await signer.recoverStringFromRaw(_message, rawSig);
//console.log(signer.recoverStringFromRaw)
console.log(await recoverAddress(_message, rawSig))
*/


//    const i = _index
//    const path = "m/44'/60'/0'/0/" + i
//    const mnemonicInstance = Mnemonic.fromPhrase(_phrase)
//    return HDNodeWallet.fromMnemonic(mnemonicInstance, path)

import {
  ethers,
  formatEther,
  getBytes,
  hashMessage,
  hexlify,
  JsonRpcProvider,
  keccak256,
  Mnemonic,
  randomBytes,
  recoverAddress,
  toUtf8Bytes,
  Wallet as EthersWallet,
  HDNodeWallet,
} from 'ethers';


const phrase = "inmate sentence heart grid virus brick monkey diamond voyage mad glide brother surround angry protect loan explain august hunt pretty grape taste point struggle"
const mnemonicInstance = Mnemonic.fromPhrase(phrase)
const i = 0
const path = "m/44'/60'/0'/0/" + i
const wallet = HDNodeWallet.fromMnemonic(mnemonicInstance, path)

//console.log(wallet)

/*
const wallet = Wallet.fromMnemonic(MNEMONIC, PATH)

const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
const wallet = provider.getSigner();
*/

const message = 'Test message I am about to sign'
const message1 = 'Test message I am about to sign'
const signature = await wallet.signMessage(message)
const digest = getBytes(hashMessage(message1))
const recoveredAddress = recoverAddress(digest, signature)

const address = await wallet.getAddress()

console.log({
  address,
  publicKey: wallet.signingKey.publicKey,
  privateKey: wallet.signingKey.privateKey,
  recoveredAddress,
  message,
  recoverdstatus: (recoveredAddress === address),
})

/*
expect(recoveredAddress).eq(wallet.address)
*/
