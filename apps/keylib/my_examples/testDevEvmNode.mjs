import { ethers } from 'ethers';

import 'dotenv/config';

import { createRequire } from "module";

const require = createRequire(import.meta.url);

const contractJson = require("../src/js/contracts/BallotDev");

//const endPoint = process.env.RPC_URL || 'http://127.0.0.1:8545/';
//const endPoint = 'http://127.0.0.1:8545/';
const endPoint = process.env.RPC_URL_EVM_NODE;

const provider = new ethers.providers.JsonRpcProvider(endPoint);


//console.log(provider);

const run = async () => {
  const blockNumber = await provider.getBlockNumber();
  console.log(blockNumber);

  //console.log(Object.keys(contractJson));

  const contract = new ethers.Contract(
    contractJson.network.address,
    contractJson.abi,
    provider
  );

  console.log(contract);

  /*
  let contractData = {};

  contractData.provider = provider; 
  contractData.contract = contract; 
  contractData.contractWithSigner = contract.connect(signer);
  contractData.abiData = abiData;
  signerAddress = address; 
  */
}

run();
