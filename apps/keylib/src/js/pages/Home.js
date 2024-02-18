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

import Wallet from '../services/wallet';

//import { ethers } from "ethers";

//import 'dotenv/config';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      provider: {},
      wallet: {},
    };
  }

  componentDidMount() {

    this.state.wallet = new Wallet();
    /*
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_URL  
    );
    this.state.provider = provider;
    */

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
    //alert('componentDidMount')
  }

  componentDidUpdate() {
    
    /*
    async function run (provider) {
      alert(
        'blockNumber(): ' + await provider.getBlockNumber()
      );
    }
    run(this.state.provider)
    */

    //console.log('this.state.provider:', this.state.provider);

    document.title = `You clicked ${this.state.count} times`;
    //alert('componentDidUpdate')
  }

  enterKeystorePhrase = async () => {
    alert('enterKeystorePhrase');
  }

  exportKeystore = async () => {
     alert('exportKeystore');
  }

  importKeystore = async () => {
    alert('importKeystore');
  }

  saveKeystore = async () => {
    alert(
      'saveKeystore: ' + await this.state.wallet.saveKeystore()
    );
  }

  getKeystore = async () => {
    alert(
      'getKeystore: ' + await this.state.wallet.getKeystore()
    );
  }

  getAddress = async () => {
    alert(
      'address[0]: ' + await this.state.wallet.getAddress()
    );
  }

  getPhrase = async () => {
    alert(
      'Phrase: ' + await this.state.wallet.getNewPhrase()
    );
  }

  getBlockNumber = async () => {
    alert(
      //'blockNumber(): ' + await this.state.provider.getBlockNumber()
      'blockNumber(): ' + await this.state.wallet.getBlockNumber()
    );
  }

  render() {
    //const provider = new ethers.providers.JsonRpcProvider(endPoint);
    return (
      <>
        <h1>Home</h1>

        <Button onClick={this.getAddress}>getAddress</Button> |

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
