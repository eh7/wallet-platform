const crypto = require('crypto')
const ethers = require('ethers')

const Mnemonic = ethers.Mnemonic
const HDNodeWallet = ethers.HDNodeWallet

const phrase = 'inmate sentence heart grid virus brick monkey diamond voyage mad glide brother surround angry protect loan explain august hunt pretty grape taste point struggle'
const iv = Buffer.from('00000000000000000000000000000000', 'hex')

const i = 0
const path = "m/44'/60'/0'/0/" + i
const mnemonicInstance = Mnemonic.fromPhrase(phrase)
const wallet = HDNodeWallet.fromMnemonic(mnemonicInstance, path)

const key = wallet.privateKey.substr(2, 64);

console.log('iv', iv)
console.log('key', key, key.length)

// Generate a random 16-byte key for AES-128
//const key = crypto.randomBytes(16).toString('hex');
//const key = '2e6c7f292306cd6518aff5ff99dba46e';

// Initialization Vector (IV) - should be random for each encryption
//const iv = Buffer.alloc(16).fill(0);

// Message to encrypt
const message = JSON.stringify({
    "created": "2024-09-19T21:08:42.884Z",
    "data": "data:application/json;base64,ewoJIm5hbWUiOiAidGVzdGluZ05hbWUiLAoJImRhdGEiOiAidGhpcyBpcyBzb21lIGRhdGEiCn0K",
    "name": "test00.json"
})

const encrptedFileFromWeb = {
    "iv": "74c52e3fa9792384870c47e0ea95d22d",
    "encryptedData": "82202c9af02c8b7af85bf775c20bb12008366055bf87829d5842bb706878a450746131ae8cfa69a2596597ab24acb09727583d250ddc91fd8f0484da26e1afaa88fd02077320e28562448cb76ce8dcf71792456e1fd9f2eb7efc83fb02f6f62d71b9c433873b345f35da500b4c6f5edbb3d5f11648b81a8bf845c4386f41caf20b05fd8efbc3c5d7309da42f9e7a2b2bc74c7849eabe7571d87bba2defafce36dd1bd915fcc3956a69318023dd2f1187",
    "index": 2
}
//const message = 'Hello, this is a secret message!';


const encrypt = () => {

  // Create cipher object
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);

  // Encrypt the message
  let encryptedMessage = cipher.update(message, 'utf-8', 'hex');
  encryptedMessage += cipher.final();
  //encryptedMessage += cipher.final('hex');

  console.log('Encrypted Message:', encryptedMessage);
  console.log('Key:', key);
  console.log('iv', iv.toString('hex'))

  return encryptedMessage
}

//////////////////////////////////////////
const decrypt = (encryptedMessage) => {
  //const message = '187145680cd07efad27ea86dbdbf7a0e7434dd5e753af1c427a147d621d7bb9980ac4ef633ec2504b8318e000757ed42'
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8');
  decryptedMessage += decipher.final();

  console.log('Decrypted Message:', decryptedMessage);
  console.log('Key:', key);
  console.log('iv', iv.toString('hex'))
}

//decrypt(
  encrypt()
//)
