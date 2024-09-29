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
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import pageSetup from '../setup';

//import Footer from "react-bootstrap/Footer";

//const display = "Hello, to Guru99 Tutorials";
//const h1tag =<h1>{display}</h1>;
//export default h1tag;

export default class SetupSeed extends React.Component {
  render() {
    pageSetup();
    return (
      <>
        <h1>SetupSeed</h1>
      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
