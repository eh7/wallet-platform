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

console.log(process.env.RPC_URL);
//console.log(ethers.JsonRpcProvider);
//console.log(ethers.JsonRpcProvider);

const endPoint = process.env.RPC_URL;
const provider = ethers.JsonRpcProvider(process.env.RPC_URL)
//const wallet = new ethers.Wallet(this.data.privateKey);

//const provider = new ethers.JsonRpcProvider();
//  process.env.RPC_URL  
//const signer = await provider.getSigner()

console.log(
  'provider:',
//  provider
);

//import Footer from "react-bootstrap/Footer";

//const display = "Hello, to Guru99 Tutorials";
//const h1tag =<h1>{display}</h1>;
//export default h1tag;

export default class Home extends React.Component {
  render() {
    //const provider = new ethers.providers.JsonRpcProvider(endPoint);
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

      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
