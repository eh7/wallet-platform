import {
  ethers,
  formatEther,
  getBytes,
  hexlify,
  hashMessage,
  JsonRpcProvider,
  keccak256,
  Mnemonic,
  randomBytes,
  recoverAddress,
  toUtf8Bytes,
  Wallet as EthersWallet,
  HDNodeWallet,
} from 'ethers';

import crypto from 'crypto';
const algorithm = 'aes-256-cbc'; //Using AES encryption

//let iv = null
//iv = crypto.randomBytes(16)
//console.log(iv)
//process.exit()

const file = {
  "created": "2024-09-19T21:08:42.884Z",
  "data": "data:application/json;base64,ewoJIm5hbWUiOiAidGVzdGluZ05hbWUiLAoJImRhdGEiOiAidGhpcyBpcyBzb21lIGRhdGEiCn0K",
  "name": "test00.json"
}

// phrase rock in office (brave)
//const phrase = "hobby slogan armor endless tank left odor puppy grow saddle high prison pupil fortune one blame belt butter deer pepper industry segment nature mail"

// phrase xps laptop (brave)
const phrase = "inmate sentence heart grid virus brick monkey diamond voyage mad glide brother surround angry protect loan explain august hunt pretty grape taste point struggle"

const getWalletFilesData = (_phrase, _index) => {
  const i = _index
  const path = "m/44'/60'/0'/0/" + i
  const mnemonicInstance = Mnemonic.fromPhrase(_phrase)
  return HDNodeWallet.fromMnemonic(mnemonicInstance, path)
}

const encryptSyncFilesData = async (_string, _phrase, _addressUser) => {
  const wallet = getWalletFilesData(_phrase, 0)
  const key = wallet.privateKey.substr(2, 64);
console.log('key', key)
  const address = wallet.address;
  const iv = crypto.randomBytes(16)
console.log('iv', iv.toString('hex'))
  let cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(key, 'hex'),
    iv
  );


//  let cipher = crypto.createCipheriv(
//    'aes-256-cbc',
//    Buffer.from(key, 'hex'),
//    iv
//  );
  const encrypted = Buffer.concat([
    cipher.update(
      _string
    ),
    cipher.final(),
  ])
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
    addressUser: _addressUser,
    addressData: address,
  };
}

const decryptSyncFilesData = (_encryptedData, _phrase) => {
  const wallet = getWalletFilesData(_phrase, 0)
  const key = wallet.privateKey.substr(2, 64);
  //const iv = Buffer.from(_encryptedData.iv, 'hex');
  const iv = Buffer.from(_encryptedData.iv, 'hex');
//console.log('iv', _encryptedData.iv)
//console.log('_encryptedData', _encryptedData)
const testIV = crypto.randomBytes(16)
console.log('key', key)
console.log('key', Buffer.from(key, 'hex'))
console.log('iv', Buffer.from(iv, 'hex'))
console.log('iv', iv.toString('hex'))
//console.log('iv', testIV)
//console.log('iv', iv.toString())
  const encryptedText = Buffer.from(_encryptedData.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
//console.log(decrypted.toString('utf8'))
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString('utf8')
}

/*
const encyptedString = await encryptSyncFilesData(process.argv[2] || "string", phrase, "addressUser")
console.log(encyptedString)
const decyptedString = await decryptSyncFilesData(encyptedString, phrase)
console.log(decyptedString)
*/

////////////////////

const encyptedStringFile = await encryptSyncFilesData(
  JSON.stringify(file),
  phrase,
  "userAddress"
)
console.log('file', file)
console.log('encyptedStringFile', encyptedStringFile)


const decyptedStringFile = await decryptSyncFilesData(
  encyptedStringFile,
  phrase,
)
console.log('decyptedStringFile', JSON.parse(decyptedStringFile))

/////////////////////////////////
//
console.log('-------------------------------------------------------------------')
console.log('--test decrypt file from logs in web3UI webapp ---------------------------')
console.log('-------------------------------------------------------------------')

const encryptedFileData1 = {
  "iv": "a933ac59880e91da8af632bfdadf8b6d",
  "encryptedData": "7b9c0a33d699a1ff1fa5bf6c95766439cdf3e73d3afa6c33534ce473cfe22a87249fc6e0599154d7e9442453a342b37ff81c96377ac76b4ea7c38fa095ed9b60557a13438b86e408b0ce815b9eef4034c3023d8ff37c2fc12b6e34aeb6e9e6ce944419c5c7173223d1688b05b1f0e33c",
  "index": 3
}
const encryptedFileData = {
    "iv": "2bdec1e1fa69f0ca6308d097dfe34639",
    "encryptedData": "099622231951741ee663ecbedb0cfcb2dec3bb689f96ba751cd9644b3ce2992399b8555bdcb55f9575c9be9b16cfdbcd0b7ba8c0143aaa76b609e13d79b9690118be7e5bc35726376a0a238af4177de57e6c99d8e77f89fd6779b5637ee6102a30407913878a341d8a89a294ea073c0901381aaccff46618737a14ca51236b2815bf652f7e14ad38ea362d2d12fca21bdf656a007830c713ad555b5d7f22510e71d0d12e3edef1f62122e78006057bec",
    "index": 2
}

const iv = "2bdec1e1fa69f0ca6308d097dfe34639"
const key = "550b42040966307d66a0fb2c4ef99843b6e1a76dbb1aa976cbcf87b2e8ba1652"

const decyptedFileData = await decryptSyncFilesData(
  encryptedFileData,
  phrase,
)

console.log('encryptedFileData', encryptedFileData)
console.log('decyptedFileData', decyptedFileData)
/*
*/
