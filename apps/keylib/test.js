/*
import { ethers } from "ethers";

const url = "https://goerli.infura.io/v3/5ad16da394384a8ca868154e1ca744c0"

// If no %%url%% is provided, it connects to the default
// http://localhost:8545, which omost nodes use.
const provider = new ethers.JsonRpcProvider(url)

// Get write access as an account by getting the signer
//const signer = await provider.getSigner()
//
async function run () {
  console.log(
    await provider.getBlockNumber()
  )
}
run()

const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

console.log(key.toString('hex'))
console.log(iv.toString('hex'))
*/

//Checking the crypto module
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption

//const key = crypto.randomBytes(32);
//const iv = crypto.randomBytes(16);
//
const key = Buffer.from('c726128a6567add145a27d301240637f727b372bb15653bc9518d4217d3fde24', 'hex');
const iv = Buffer.from('ae32fedeb2302c300cc05b4d335f6a68', 'hex');

console.log(typeof(key))
console.log(key)
const keyHexStr = key.toString('hex')
console.log(keyHexStr)
console.log(Buffer.from(keyHexStr, 'hex'))

console.log('')
console.log(iv)
const ivHexStr = iv.toString('hex')
console.log(ivHexStr)
console.log(Buffer.from(ivHexStr, 'hex'))
console.log(typeof(Buffer.from(ivHexStr, 'hex')))

//process.exit()

//Encrypting text
function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

// Text send to encrypt function
var hw = encrypt("Welcome to Tutorials Point...")
console.log(hw)
console.log(decrypt(hw))
