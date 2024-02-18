import bip39 from 'bip39-light';
//import EthjsWallet from 'ethereumjs-wallet';
import EthjsWallet, { hdkey as etherHDkey } from 'ethereumjs-wallet';
import { ethers } from 'ethers';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
//const key = crypto.randomBytes(32);
//const iv = crypto.randomBytes(16);

//console.log('key::::iv :: ', key, '::::', iv);
//console.log(key.toString('utf8'), '::::', iv);

import 'dotenv/config';
//import * as dotenv from 'dotenv';
//dotenv.config();

//const myEventHandler = function () {
//  console.log('event emitted');
//}
//eventEmitter.on('scream', myEventHandler);

const endPoint = process.env.RPC_URL || '';

export default class Wallet {

  constructor(
     //eventEmitter,
     walletInitData,
  ) {
    //this.eventEmitter = eventEmitter;
    this.data = '';
    this.initData = walletInitData;
    this.provider = {};

    this.key = Buffer.from(process.env.KEY, 'hex');
    this.iv = Buffer.from(process.env.IV, 'hex');

//    this.key = crypto.randomBytes(32);
//    this.iv = crypto.randomBytes(16);

    this.setupProvider();
    console.log('this.provider:', this.provider);

    this.setupNewWallet();

    /*
    const text = 'hello testing 123';
    const encryptedText = this.encrypt(text);
    const decryptedText = this.decrypt(encryptedText);
    console.log(
      'zzzzzzzzzzzzzzzzzzzzzzzzzzzz',
    );
    console.log(
      text,
    );
    console.log(
      encryptedText,
    );
    console.log(
      decryptedText,
    );
    */

    /*
    // TODO move this into it's own function
    window.walletAPI.keystoreSeedHex((event, keystore) => {
      console.log('xxxxxxxxxxxxxxx keystore xxxxxxxxxxxx', keystore);
    });
    */

    //this.setupWallet(walletInitData);
  }

  setupProvider = () => {
    this.provider = new ethers.providers.JsonRpcProvider(endPoint);
  }

  getBlockNumber = async () => {
    return await this.provider.getBlockNumber()
  }

  //Encrypting text
  encrypt = (text) => {
    //const key = Buffer.from(this.key);
    let cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(this.key),
      this.iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      iv: this.iv.toString('hex'),
      encryptedData: encrypted.toString('hex')
    };
  }

  // Decrypting text
  decrypt = (text) => {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
  }

  setupNewWallet = async () => {
    if (!localStorage.getItem("keyset")) {
      // setup wallet data
      alert('setup wallet data as not wallet daa provided')
      localStorage.setItem("keyset", this.data.mnemonic);
      this.setupWallet(this.data.mnemonic);
      //const phrase = await bip39.generateMnemonic();
      //
      const HDwallet = etherHDkey.fromMasterSeed(seedHex);
      const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
      const address = zeroWallet.getAddressString();

    } else {
      // import or load wallet data
      alert('import or load wallet data')
    }
  }

  getAddress = async () => {
    if (localStorage.getItem('keyset')) {
      const phrase = this.decrypt(
        JSON.parse(
          localStorage.getItem(
            "phrase",
          )
        )
      )
/*
      alert(
        "phrase: " +
        this.decrypt(
          JSON.parse(
            phrase,
          )
        )
      );
console.log(
  this.decrypt(
    JSON.parse(phrase)
  )
);
*/

      //WIP
      const seedHex = bip39.mnemonicToSeedHex(phrase);
      const HDwallet = etherHDkey.fromMasterSeed(seedHex);
      const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
      const address = zeroWallet.getAddressString();
      const addressCheckSum = zeroWallet.getChecksumAddressString();
      return addressCheckSum;

    } else {
      alert('no keyset error');
    }
  }

  getNewPhrase = async () => {
    const phrase = await bip39.generateMnemonic();
    localStorage.setItem(
      "phrase",
      JSON.stringify(
        this.encrypt(
          phrase
        )
      )
    );
    localStorage.setItem(
      "keyset",
      true,
    );
    return phrase;
  }

  checkWalletSetup = (message) => {
    if (this.data.address) {
      return true;
    } else {
      return false;
    }
  }

  setupWalletKeystore = async (_password) => {
    const mnemonic = this.data.mnemonic;
    const seedHex = bip39.mnemonicToSeedHex(mnemonic);
    const keystore = await this.seedHexToKeystore(seedHex, _password);
    console.log('after seedHexToKeystore', mnemonic, seedHex);
    //console.log('keystore:', keystore);
    //this.data.keystore = keystore;
    console.log('save data walletKeystore', this.data);
    this.eventEmitter.emit('wallet provider setup done', this);
  }

  setupWallet = async (message) => {
    const mnemonic = message || await bip39.generateMnemonic();
    const seedHex = bip39.mnemonicToSeedHex(mnemonic);
    const HDwallet = etherHDkey.fromMasterSeed(seedHex);
    const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    const address = zeroWallet.getAddressString();
    const addressCheckSum = zeroWallet.getChecksumAddressString();
    //const keystore = this.seedHexToKeystore(seedHex, '_password');
    //const keystore = await this.seedHexToKeystore(seedHex, '_password');
    this.data = {
      address: zeroWallet.getAddressString(),
      addressCheckSum,
      mnemonic: mnemonic,
      privateKey: zeroWallet.getPrivateKeyString(),
      publicKey: zeroWallet.getPublicKeyString(),
      //keystore
    };
    console.log('save data', this.data);

    this.ethersData = await this.setupEthers();
    console.log('this wallet.js:', this.ethersData.provider);

    //this.eventEmitter.emit('wallet provider setup done', this);
    //console.log('this wallet.js:', await this.getNetwork());
    // console.log('this.setupEthers', this.ethersData);

    /*
    console.log('this.ethersData', this.ethersData);
    alert('ethers data loaded see console');
    //alert(`mnemonic: ${mnemonic}`);
    //alert(`seedHex: ${seedHex}`);
    //alert(`seedHex: ${seedHex}`);
    console.log('wallet data:', this.data);
    alert(JSON.stringify(this.data));
    */
  }

  setupEthers = async (data) => {
    if (endPoint === '') {
      throw({
        error: 'no endPoint set',
      });
    }
    const provider = new ethers.providers.JsonRpcProvider(endPoint);
    const wallet = new ethers.Wallet(this.data.privateKey);
    //const currentBlock = await provider.getBlockNumber();
    //console.log('currentBlock:', currentBlock);
    //alert(currentBlock);
    
    return {
      ethers,
      //latestBlock: currentBlock,
      provider,
      wallet,
    };
  }

  getNetwork = async () => {
    return await this.ethersData.provider.getNetwork();
  }

  getAddressOld = () => {
    const phrase = localStorage.getItem('phrase');
    console.log(
      phrase
    );
    /*
    const seedHex = bip39.mnemonicToSeedHex(
      this.decrypt(phrase)
    );
    const HDwallet = etherHDkey.fromMasterSeed(seedHex);
    const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    const address = zeroWallet.getAddressString();
    const addressCheckSum = zeroWallet.getChecksumAddressString();
    return addressCheckSum;
    */
    //return this.wallet.data.addressCheckSum;
  }

  // TODO debug this and check it works okay
  recoverSeedHexFromKeystore = async (_password) => {
    const password = _password;
    const resPkey0 = await EthjsWallet.fromV3(this.data.keystore0, password);
    const resPkey1 = await EthjsWallet.fromV3(this.data.keystore1, password);
    // console.log(_pkeySeed);
    const seedHex = resPkey0.privateKey.toString('hex') + resPkey1.privateKey.toString('hex');
    const HDwallet = hdkey.fromMasterSeed(seedHex);
    const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    const address = zeroWallet.getAddressString();
    const addressCheckSum = zeroWallet.getChecksumAddressString();
    console.log(addressCheckSum);
  }

  seedHexToKeystore = async (_pkeySeed, _password) => {
    try {
      const pkey0 = _pkeySeed.substr(0, (_pkeySeed.length / 2));
      const pkey1 = _pkeySeed.substr((_pkeySeed.length / 2));
      const password = _password;
      const keystore0 = await this.pkeyV3(pkey0, password);
      const keystore1 = await this.pkeyV3(pkey1, password);
      //this.data.keystore0 = keystore0;
      //this.data.keystore1 = keystore1;
      const keystore = [
        keystore0,
        keystore1,
      ];
      this.data.keystore = keystore;
//console.log('xxxxxxxxxxxxxxxxxxxxxx', window.walletAPI.saveKeystoreData);
      window.walletAPI.saveKeystoreData(this.data.keystore);
    }
    catch (err) {
      console.log('seedHexToKeystore err:', err);
    }
  }

  pkeyV3 = async (_pkey, _password) => {
    try {
      const key = Buffer.from(_pkey, 'hex');
      const wallet = EthjsWallet.fromPrivateKey(key);
      return await wallet.toV3(_password);
    }
    catch (err) {
      console.log('pkeyV3 err:', err);
    }
  }
}
