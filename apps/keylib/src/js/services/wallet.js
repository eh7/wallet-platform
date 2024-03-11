import bip39 from 'bip39-light';
//import EthjsWallet from 'ethereumjs-wallet';
import EthjsWallet, { hdkey as etherHDkey } from 'ethereumjs-wallet';
import { ethers } from 'ethers';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption

import 'dotenv/config';

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
    this.networkProvider = {};

    this.key = Buffer.from(process.env.KEY, 'hex');
    this.iv = Buffer.from(process.env.IV, 'hex');

    this.setupProvider();
    console.log('this.provider:', this.provider);
  }

  setupProvider = () => {
    const networks = JSON.parse(localStorage.getItem("networks"));

    this.provider = new ethers.providers.JsonRpcProvider(endPoint);

    networks.map((network, i) => {
      this.networkProvider[networks[i].chainId] = new ethers.providers.JsonRpcProvider(networks[i].rpcUrl);
      //console.log(networks[2].rpcUrl === endPoint);
      //console.log(Object.keys(this.networkProvider));
    })
  }

  getBlockNumber = async () => {
    return await this.provider.getBlockNumber()
  }

  getBalance = async (_address) => {
    const balance = await this.provider.getBalance(_address);
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
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
      console.log('import or load wallet data')
    }
  }

  getSeedHex= async () => {
    return await this.decrypt(
      JSON.parse(
        localStorage.getItem(
          "seedHex",
        )
      )
    )
  }

  saveKeystorePassword = async (_password) => {
    const seedHex = this.getSeedHex();
    const keystore = await this.seedHexToKeystore(seedHex, _password);
    localStorage.setItem(
      'keystore',
      JSON.stringify(keystore)
    );
    console.log('keystore:', JSON.stringify(keystore));
  }

  saveKeystore = async () => {
    const _password = "thisisapassword";
    const seedHex = this.getSeedHex();
    const keystore = await this.seedHexToKeystore(seedHex, _password);
    localStorage.setItem(
      'keystore',
      JSON.stringify(keystore)
    );
    console.log('saveKeystore keystore :: ', keystore);
  }

  getKeystoreJson = () => {
    try {
      if (localStorage.getItem('keyset')) {
        const keystore = JSON.parse(
          localStorage.getItem(
            "keystore",
          )
        )
        return keystore;
      }
    } catch (e) {
      console.log('ERROR :: wallet :: getKeystoreJson :: ', e);
    }
  }

  getKeystoreWithPasswordKeystore = async (_password, _keystore) => {
    return await this.recoverSeedHexFromKeystore(_keystore, _password);
  }

  getKeystoreWithPassword = async (_password) => {
    if (localStorage.getItem('keystore')) {
      try {
        const keystore = JSON.parse(
          localStorage.getItem(
            "keystore",
          )
        )
        console.log('wallet.getKeystore:', keystore);
        return await this.recoverSeedHexFromKeystore(keystore, _password);
      } catch (e) {
        console.log('ERROR :: wallet :: getKeystoreWithPassword :: ', e); 
      }
    }
  }

  getKeystore = async () => {
    if (localStorage.getItem('keyset')) {
      const _password = "password01";
      const keystore = JSON.parse(
        localStorage.getItem(
          "keystore",
        )
      )
      console.log('wallet.getKeystore:', keystore);
      return await this.recoverSeedHexFromKeystore(keystore, _password);
    }
  }
 
  getAddress = async () => {
    if (localStorage.getItem('keyset')) {
      // TODO remove this from localStorage after dev
      /*
      const phrase = this.decrypt(
        JSON.parse(
          localStorage.getItem(
            "phrase",
          )
        )
      )
      */
      const seedHex = this.decrypt(
        JSON.parse(
          localStorage.getItem(
            "seedHex",
          )
        )
      )

      //WIP
      //const seedHex = bip39.mnemonicToSeedHex(phrase);
//console.log(seedHex)
//
      const HDwallet = etherHDkey.fromMasterSeed(seedHex);

      /*
      let walletNew = HDwallet.derivePath("m/44'/60'/0'/0/1").getWallet();
      const addressOne = walletNew.getAddressString();
      walletNew = HDwallet.derivePath("m/44'/60'/0'/0/2").getWallet();
      const addressTwo = walletNew.getAddressString();
      */

      const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
      const address = zeroWallet.getAddressString();
      const addressCheckSum = zeroWallet.getChecksumAddressString();
      return addressCheckSum;

    } else {
      alert('no keyset error');
    }
  }

  // TODO async setup if required for FormPassword
  getNewPasswordForSeed = async () => {
    return new Promise(function(resolve, reject) {
      try {
        const newPassword = await bip39.generateMnemonic();
        resolve(newPassword);
      } catch (e) {
        reject('ERROR :: walletService :: getNewPasswordForSeed :: ', e);
      }
    })
  }

  getNewPhraseForSeedOperation = async () => {
    return new Promise(function(resolve, reject) {
      try {
        const newPhrase = await bip39.generateMnemonic();
        resolve(newPhrase);
      } catch (e) {
        reject('ERROR :: walletService :: getNewPhraseForSeed :: ', e);
      }
    })
  }

  getNewPhraseForSeed = async () => {
    //const newPhrase  = await this.getNewPhraseForSeedOperation();
    return await bip39.generateMnemonic();
  }

  saveNewPhraseSeed = async (_words, _password) => {
    const phrase = _words.join(' ');
    const seedHex = bip39.mnemonicToSeedHex(phrase);
    // TODO remove this console.log and think about how we
    // store seedHex temporaly.???? 
    // console.log(phrase);
    localStorage.setItem(
      "seedHex",
      JSON.stringify(
        this.encrypt(seedHex)
      )
    )
    localStorage.setItem(
      "keyset",
      true,
    );
    console.log("new phrase saves and loaded");
    //console.log(_password);

    console.log("!!! saving keystore");
    await this.saveKeystorePassword(_password);
    console.log("!!! saved keystore");
  }

  getNewPhrase = async () => {
    const phrase = await bip39.generateMnemonic();
    const seedHex = bip39.mnemonicToSeedHex(phrase);
    /*
    localStorage.setItem(
      "phrase",
      JSON.stringify(
        this.encrypt(
          phrase
        )
      )
    );
    */
    localStorage.setItem(
      "seedHex",
      JSON.stringify(
        this.encrypt(seedHex)
      )
    )
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

  initSetupWalletKeystore = async (_seedHex) => {
    localStorage.setItem(
      "seedHex",
      JSON.stringify(
        this.encrypt(_seedHex)
      )
    )
    localStorage.setItem(
      "keyset",
      true,
    );
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

  recoverHexFromSingleKeystore = async (_keystore, _password) => {
    try {
      console.log(
        'recoverHexFromSingleKeystore',
        _keystore,
        _password,
      );
      const resKey = await EthjsWallet.fromV3(_keystore, _password);
      const hexKey = resKey.privateKey.toString('hex');
      return hexKey;
    }
    catch (e) {
      console.log("ERROR catch recoverSeedHexFromKeystore:", e);
    }
  }

  // TODO debug this and check it works okay
  recoverSeedHexFromKeystore = async (_keystore, _password) => {
    try {
      const password = _password;
      console.log(
        'recoverSeedHexFromKeystore',
        _keystore[0],
        _keystore[1],
        _password
      );
      const resPkey0 = await EthjsWallet.fromV3(_keystore[0], password);
      const resPkey1 = await EthjsWallet.fromV3(_keystore[1], password);
      // console.log(_pkeySeed);
      const seedHex = resPkey0.privateKey.toString('hex') + resPkey1.privateKey.toString('hex');
      //console.log("recoverSeedHexFromKeystore :: seedHex", seedHex);
      return seedHex;

      console.log("recoverSeedHexFromKeystore :: seedHex", seedHex);
      const HDwallet = etherHDkey.fromMasterSeed(seedHex);
      const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
      const address = zeroWallet.getAddressString();
      const addressCheckSum = zeroWallet.getChecksumAddressString();
      //console.log(addressCheckSum);
      return addressCheckSum;
/*
*/
    }
    catch (e) {
      console.log("ERROR catch recoverSeedHexFromKeystore:", e);
    }
  }

  seedHexToKeystore = async (_pkeySeed, _password) => {
    try {
      const pkeySeed = await _pkeySeed;
      const pkey0 = pkeySeed.substr(0, (pkeySeed.length / 2));
      const pkey1 = pkeySeed.substr((pkeySeed.length / 2));
      const password = _password;
      const keystore0 = this.pkeyV3(pkey0, password);
      const keystore1 =  this.pkeyV3(pkey1, password);
      const keystore = [
        await keystore0,
        await keystore1,
      ];
      return keystore;
    }
    catch (err) {
      console.log('seedHexToKeystore err:', err);
    }
  }

  pkeyV3 = async (_pkey, _password) => {
    try {
      const key = Buffer.from(_pkey, 'hex');
      const wallet = EthjsWallet.fromPrivateKey(key);
      const v3Options = {
        kdf: 'scrypt',
        dklen: 32,
        n: 262144,
        r: 8,
        p: 1,
        cipher: 'aes-128-ctr'
      }
      const n = Math.pow(2, 16);
      const _v3Options = {
        kdf: 'scrypt',
        dklen: 32,
        n,
        r: 8,
        p: 1,
        cipher: 'aes-128-ctr'
      }
      console.log(_v3Options);
      return await wallet.toV3String(_password, _v3Options);
    }
    catch (err) {
      console.log('pkeyV3 err:', err);
    }
  }
}
