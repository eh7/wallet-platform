/*
 * import Head from "next/head";
import Container from "react-bootstrap/Container";
import AppGuides from "@/components/AppGuides";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ExampleComponents from "@/components/ExampleComponents";
*/

//export class App extends React.Component {
//  public render() {
//  }
//}

import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavMain from '../components/NavMain';

import { ethers } from "ethers";

import 'dotenv/config';

//require('dotenv').config()
console.log(process.env.RPC_URL);

//const provider = ethers.JsonRpcProvider();
//const provider = new ethers.JsonRpcProvider(
//  process.env.RPC_URL  
//);
//const signer = await provider.getSigner()

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      provider: {},
    };
  }

  componentDidMount() {

    /*
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      }
    };

    initializeProvider();
    */

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_URL  
    );
    this.state.provider = provider;
    console.log('this.state.provider:', this.state.provider);

    /*
    async function run () {
      console.log(
        'blockNumber():',
        await provider.getBlockNumber()
      );
    }
    run()
    */

    document.title = `You clicked ${this.state.count} times`;
    alert('componentDidMount')
  }

  componentDidUpdate() {
    
    async function run (provider) {
      alert(
        'blockNumber(): ' + await provider.getBlockNumber()
      );
    }
    run(this.state.provider)

    console.log('this.state.provider:', this.state.provider);

    document.title = `You clicked ${this.state.count} times`;
    alert('componentDidUpdate')
  }

  render() {
    return (
      <>
        <h1>Home</h1>

        keyset: {
          localStorage.getItem("keyset") ?
          <h3>user already setup {localStorage.getItem("keyset")}</h3> :
          <h3>setup user</h3>
        }
        <h4>*** setup pass phrase</h4>
        {localStorage.setItem("phrase", '')}
        {
          localStorage.setItem("phrase", 'phrase')
        }
        <h3>user already setup '{localStorage.getItem("phrase")}'</h3>

        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>

      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
