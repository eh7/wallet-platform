import { ethers } from 'ethers';

import 'dotenv/config';

import { createRequire } from "module";

if (!process.argv[3]) {
  console.log('USAGE: node ', process.argv[1], ' ', process.argv[2], ' ', process.argv[3]);
  process.exit(0);
}

const require = createRequire(import.meta.url);

const contractJson = require("../src/js/contracts/BallotDev");

//console.log(contractJson.network.address)
//process.exit(0);

const endPoint = process.env.RPC_URL_EVM_NODE;

const provider = new ethers.providers.JsonRpcProvider(endPoint);

let pkey = [];
pkey.push(process.env.PKEY_URL_EVM_NODE0);
pkey.push(process.env.PKEY_URL_EVM_NODE1);
pkey.push(process.env.PKEY_URL_EVM_NODE2);
pkey.push(process.env.PKEY_URL_EVM_NODE3);
pkey.push(process.env.PKEY_URL_EVM_NODE4);
pkey.push(process.env.PKEY_URL_EVM_NODE5);
pkey.push(process.env.PKEY_URL_EVM_NODE6);
pkey.push(process.env.PKEY_URL_EVM_NODE7);
pkey.push(process.env.PKEY_URL_EVM_NODE8);
pkey.push(process.env.PKEY_URL_EVM_NODE9);
pkey.push(process.env.PKEY_URL_EVM_NODE10);
pkey.push(process.env.PKEY_URL_EVM_NODE11);
pkey.push(process.env.PKEY_URL_EVM_NODE12);
pkey.push(process.env.PKEY_URL_EVM_NODE13);
pkey.push(process.env.PKEY_URL_EVM_NODE14);

//pkey.map((pkey) => {
  const voteId = Math.floor(
    Math.random() * 2
  );

  const signer = new ethers.Wallet(pkey[6], provider);

  const run = async () => {

    const contract = new ethers.Contract(
      contractJson.network.address,
      contractJson.abi,
      provider
    );

    const contractWithSigner = contract.connect(signer);

    const ballotId = process.argv[2];
    const candidateId = voteId || process.argv[3];

    const functionName = "castVote";
    //const returnData = await contract[functionName]();
    const returnData = await contractWithSigner[functionName](
      ballotId,
      candidateId,
    );
    console.log(
      "executeContractFunction :: BallotDev :: owner :: ",
      returnData,
    );
    const receipt = await returnData.wait();
    console.log(
      'receipt',
      receipt,
    );
  }

  run();
//});
