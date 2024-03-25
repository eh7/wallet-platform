import { ethers } from 'ethers';

import 'dotenv/config';

import { createRequire } from "module";

const require = createRequire(import.meta.url);

const endPoint = process.env.RPC_URL_EVM_NODE;
const pkey = process.env.PKEY_URL_EVM_NODE0;

const provider = new ethers.providers.JsonRpcProvider(endPoint);

const run = async () => {
  const privateKeyString = pkey;
  const signer = new ethers.Wallet(privateKeyString, provider);
  //const to = "0x7574b8D4C0C2566b671C530d710821EB6694bE0C";
  const to = "0x4bfa2277d34304f1bb4fbf496e6e83ee535952f6";
  const value = "1";
console.log(signer, signer.address, to, value);
  const params = {
    from: signer.address,
    to: to,
    value: ethers.utils.parseUnits(value, 'ether').toHexString(),
  };
  console.log(params);
  const transaction = await signer.sendTransaction(params)
  //console.log('transaction hash:', transaction.hash);
  console.log('transaction:', transaction);
  const receipt = await transaction.wait(transaction);
  console.log('receipt:', receipt);
/*
*/
}

run();
