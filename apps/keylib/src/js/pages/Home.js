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

import NavMain from '../components/NavMain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import Footer from "react-bootstrap/Footer";

//const display = "Hello, to Guru99 Tutorials";
//const h1tag =<h1>{display}</h1>;
//export default h1tag;

export default class Home extends React.Component {
  render() {
    return (
      <>
        <h1>Home</h1>
        keyset: {
          localStorage.getItem("keyset") ?
          <h3>user already setup {localStorage.getItem("keyset")}</h3> :
          <h3>setup user</h3>
        }
      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
