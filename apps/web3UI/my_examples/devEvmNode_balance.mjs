import { ethers } from 'ethers';

import 'dotenv/config';

import { createRequire } from "module";

const require = createRequire(import.meta.url);

const endPoint = process.env.RPC_URL_EVM_NODE;
const pkey = process.env.PKEY_URL_EVM_NODE0;

const provider = new ethers.providers.JsonRpcProvider(endPoint);

const getBalance = async (address) => {
  const balance = ethers.utils.formatEther(
    (await provider.getBalance(
      address,
    )).toString()
  );
  console.log('balance (', address, ')', balance);
}

const run = async () => {
  const privateKeyString = pkey;
  const signer = new ethers.Wallet(privateKeyString, provider);
  // xps 
  //const address = "0x7574b8D4C0C2566b671C530d710821EB6694bE0C";
  // xps etherWallet devEvmNode
  //const to = "0x4bfa2277d34304f1bb4fbf496e6e83ee535952f6";
  // rock
  const address = "0xF125Fe77570a4E51B16B674C95ace26fbE99164e";
  //const to = "0x92dAf44EE49DCdAA21e9dcb90ceb6bd50f20AC1A";
  
  getBalance(address);

//  const balance = await provider.getBalance(address);
//  console.log(balance);
}

run();
