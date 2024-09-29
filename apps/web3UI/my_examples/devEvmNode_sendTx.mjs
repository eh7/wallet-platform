import { ethers } from 'ethers';

import 'dotenv/config';

import { createRequire } from "module";

const require = createRequire(import.meta.url);

const endPoint = process.env.RPC_URL_EVM_NODE;
//const pkey = process.env.PKEY_URL_EVM_NODE0;
const pkey = process.env.PKEY_URL_EVM_NODE0;
//const pkeyRecieve = process.env.PKEY_URL_EVM_NODE;
const pkeyRecieve = process.env.PRIVATE_KEY_DEV_EVM_ROCK_KEYLIB;

//const provider = new ethers.providers.JsonRpcProvider(endPoint);
const provider = new ethers.JsonRpcProvider(endPoint);

const run = async () => {
  const privateKeyString = pkey;
  const signerFrom = new ethers.Wallet(privateKeyString, provider);
  const signerTo = new ethers.Wallet(pkeyRecieve, provider);
  const to = "0xF125Fe77570a4E51B16B674C95ace26fbE99164e";
  const value = "1";
  console.log(
    signerFrom.address,
    signerTo.address,
    value,
  );
  // xps 
  //const to = "0x7574b8D4C0C2566b671C530d710821EB6694bE0C";
  // xps etherWallet devEvmNode
  //const to = "0x4bfa2277d34304f1bb4fbf496e6e83ee535952f6";
  // rock
  //const to = "0xF125Fe77570a4E51B16B674C95ace26fbE99164e";
  //const to = "0x92dAf44EE49DCdAA21e9dcb90ceb6bd50f20AC1A";
//console.log(signer, signer.address, to, value);
//  const val = ethers.parseUnits(value, 'ether')
//console.log(
//  //"value:", ethers.hexlify(ethers.parseUnits(value, 'ether'))
//  typeof ethers.parseUnits(value, 'ether'),
//  ethers.parseEther(val.toString()),
//  ethers.parseEther("1"),
//)
  const params = {
    from: signerFrom.address,
    to: signerTo.address,
    value: ethers.parseEther(value),
    //value: ethers.utils.parseUnits(value, 'ether').toHexString(),
  };
  console.log(params);
//process.exit()
  const transaction = await signerFrom.sendTransaction(params)
  //console.log('transaction hash:', transaction.hash);
  console.log('transaction:', transaction);
  //const receipt = await transaction.wait(transaction);
  const receipt = await transaction.wait();
  console.log('receipt:', receipt);
/*
*/
}

run();
