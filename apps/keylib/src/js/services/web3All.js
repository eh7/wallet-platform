import React, { useState, useEffect } from 'react';
import { useTable } from "react-table";
import {
  BigNumber,
  ethers,
  utils,
} from "ethers";
import {
  Button,
  Card,
  ListGroup,
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Wallet from '../services/wallet';

import {
  contractsJson as _contractsJson,
} from '../services/conf';

class Web3All {

  contractData = {};

  constructor (contractName, formData) {
    console.log('################# contractName', contractName);
    console.log('formData :: ', formData);
    if (contractName === "Bespoke") {
console.log('formData :: ', formData);
      this.contractName = contractName; 
      this.abi = "";//contractJson.abi; 
      this.address = "";//contractJson.network.address; 
      this.networkId = "";//contractJson.networkId; 
      this.creationBlock = "";//contractJson.creationBlock; 
console.log('this::', this);
    } else {

      let contractJson = '';
      if (contractName === 'Ballot') {
        contractJson = require('../contracts/Ballot');
      } else if (contractName === 'Eh7Token') {
        contractJson = require('../contracts/Eh7Token');
      } else if (contractName === 'BallotDev') {
        contractJson = require('../contracts/BallotDev');
      } else if (contractName === 'EtherWallet') {
        contractJson = require('../contracts/EtherWallet');
      }
      //contractJson = require(_contractsJson[contractName]);
//console.log(contractJson);
//
      this.contractName = contractJson.contract; 
      this.abi = contractJson.abi; 
      this.address = contractJson.network.address; 
      this.networkId = contractJson.networkId; 
      this.creationBlock = contractJson.creationBlock; 

      this.wallet = new Wallet();
/*
*/
    }
    //alert('constructor complete');

    // await contractSetup(this);
  }

  SetContractData (formData) {
    this.contractName = 'Bespoke'; 
    this.abi = formData.contractAbi;
    this.address = formData.contractAddress;
    this.networkId = formData.contractNetworkId;
    this.creationBlock = formData.contractBlockNo;
  }

  GetAbi (props) {
    // console.log('GetAbi props:', props);
    // alert('GetAbi:', props.abi);

    const data = [];
    for (let i = 0; i < Object(props.abi).length; i++) {
      const item = Object(props.abi)[i];
      if (item.type === 'function') {
        data.push(item);
      }
    }
    return data;
  }

  GetEventsAbi (props) {
    // console.log('GetEventsAbi props:', props);
    // alert('GetAbi:', props.abi);

    const data = [];
    for (let i = 0; i < Object(props.abi).length; i++) {
      const item = Object(props.abi)[i];
      if (item.type === 'event') {
        data.push(item);
      }
    }
    return data;
  }

  async executeContractFunction (functionName, values, inputs, stateMutability) {
    const args = [];
    inputs.map((input) => {
      args.push(values[input.name]);
    });

    //alert('signerAddress :: ' + this.signerAddress);
  
    if (stateMutability === 'view' || stateMutability === 'pure') {
      try {
//console.log('zzzzzzzzzzzzzzzzzzzzzzz ...args', ...args);
//console.log('zzzzzzzzzzzzzzzzzzzzzzz inputs', inputs);
//const returnData = await this.contractData.contract[functionName](0, '0x7574b8D4C0C2566b671C530d710821EB6694bE0C');
        const returnData = await this.contractData.contract[functionName](...args);
        console.log(
          "executeContractFunction - test CALL WITH REF :: ",
          returnData,
        );
        return returnData;
      } catch (e) {
        console.log('(view call error)', e); 
        alert('(view call error)');
      }
    } else {
      try {
        const returnData = await this.contractData.contractWithSigner[functionName](...args);
        const network = JSON.parse(localStorage.getItem("network"));
        //returnData.hash
        console.log(
          "executeFunction - stateMutability not pure or view:",
          returnData.hash,
          returnData,
        );
        const receipt = await returnData.wait();
        console.log(
          "reciept executeFunction - stateMutability not pure or view:",
          receipt,
        );
        return receipt;
      } catch (e) {
        console.log('(exec call error)', e); 
        alert('(exec call error:\n\n' + e.reason);
      }
    }
  }

  async contractSetup (abiData) {
//console.log('zccccccccccccccccccccccccccccccccc', abiData);
    let networkProvider = {};
    const networks = JSON.parse(localStorage.getItem("networks"));
    if (networks === null) {
      console.log(localStorage.getItem("networks"));
    } else {
      networks.map((network, i) => {
//console.log(typeof networks[i].chainId);
        networkProvider[networks[i].chainId] = new ethers.providers.JsonRpcProvider(networks[i].rpcUrl);
//console.log('sssssssssssssssssssssssssss', String(abiData.networkId), networks[i].chainId);
      })
    }
    const provider = networkProvider[
      String(abiData.networkId)
    ];

    const network = JSON.parse(localStorage.getItem("network"));
    //const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
    const privateKeyString = await this.wallet.getPrivateKey();
    const address = await this.wallet.getAddress();
    const signer = new ethers.Wallet(privateKeyString, provider);

    // TODO: this is metamask example setup get that working to as option...
    //    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //    const address = await provider.send("eth_requestAccounts", []);
    //    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      abiData.address,
      abiData.abi,
      provider
    );

    this.contractData.provider = provider; 
    this.contractData.contract = contract; 
    this.contractData.contractWithSigner = contract.connect(signer);
    this.contractData.abiData = abiData;
    this.signerAddress = address; 
  }

  async Logs (abiData, eventType) {
    console.log('IN LOGS:',
      eventType, 
      this.creationBlock,
    );
    await this.contractSetup(abiData);
console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 1, eventType.name, Number(this.creationBlock), 'latest');
    // const events = await this.contractData.contract.queryFilter('PropertyAdded', 26553965, 26554985);
    const events = await this.contractData.contract.queryFilter(
      eventType.name,
      Number(this.creationBlock),
      'latest'
    );
console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 1);
    return events;
  }

  getBlockTimestamp (blockNo) {
    return this.contractData.provider.getBlock(blockNo);
  }

  async getBlockTimestampSync (blockNo) {
    return await this.getBlockTimestamp(blockNo);
  }

  async checkNetwork () {
    const targetNetworkId = ethers.utils.hexValue(
      Number(this.networkId)
    );
    console.log(
      'Contract Json networkId',
       targetNetworkId,
    ); 

    if (window.ethereum) {
      const currentChainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      // return true if network id is the same
      if (currentChainId == targetNetworkId) return true;
      // return false is network id is different
      return false;
    }
  }

  async switchNetwork () {
    const targetNetworkId = ethers.utils.hexValue(
      Number(this.networkId)
    );
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: targetNetworkId }],
    });
    // refresh
    // window.location.reload();
  }

  async addNetwork (chainId, name, pcUrls) {
    const targetNetworkId = ethers.utils.hexValue(
      Number(chainId)
    );
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          { 
            chainId: targetNetworkId,
            chainName: name,
            pcUrls: pcUrls
          }
        ],
      });
    }
    catch (e) {
      console.log('In  web3All addNetwork:', e);
    }
  }
}

function clickedLi (index, item, myEmitter) {
  console.log('onClick item:', item, item.inputs[0]);
  myEmitter.emit('eventShowForm', item); 
}

function Logs (web3All) {
//  const properties = await this.contractData.contract.queryFilter("PropertyAdded", 0);
//alert(1);
 // console.log(properties);
  console.log('Logs:', web3All.contractData);
  return [];
//  return (
//    <div>
//       Logs web3All {props.web3All}
//    </div>
//  );
/*
alert(1);
  const returnLogs = await this.contractData.contract.queryFilter();
alert(returnLogs);
  return (
    <div>
      Contract getLogs:
      {props}<br/>
      returnLogs: {returnLogs}
    </div>
  );
*/
}

function FormatAbi (props) {

  const data = [];
 
  for (let i = 0; i < Object(props.abi).length; i++) {
    const item = Object(props.abi)[i];
    data.push(item);
  }
  const dataItems = data.map((item, i) => {
    let exec = '';
    if (item.type === 'function') {
      exec = 'exex';
    }
    if (item.type === 'function') {
      return (
        <li key={i} className="p-1">
          <Button onClick={() => clickedLi(i, item, props.myEmitter)} variant="outline-primary">
            { item.name }
          </Button>
        </li>
      );
    }
  });
  const listItems = data.map((item, i) => {
    let exec = '';
    if (item.type === 'function') {
      exec = 'exex';
    }
    if (item.type === 'function') {
      return (
        <ListGroup.Item as="li" key={i}>
          <Button onClick={() => clickedLi(i, item, props.myEmitter)} variant="outline-primary">
            { item.name }
          </Button>
        </ListGroup.Item>
      );
    }
  });
  return (
    <div className="p-4">
      <h4>Contract Functions</h4>
      <ListGroup>
        {listItems}
      </ListGroup>
    </div>
  );
      // <ul>{dataItems}</ul>
}


export {
  Web3All,
  FormatAbi,
  Logs,
  //GetAbi,
  //executeContractFunction,
  //contractData,
  //contractSetup,
}
