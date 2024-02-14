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

import NavMain from '../components/NavMain';

//import Footer from "react-bootstrap/Footer";

//const display = "Hello, to Guru99 Tutorials";
//const h1tag =<h1>{display}</h1>;
//export default h1tag;

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Button variant="primary" href="/">/</Button>
        <Button variant="primary" href="/about">/about</Button>
        <Button variant="primary" href="/products">/products</Button>
        <Container as="main" className="py-4 px-3 mx-auto">
	  Home
        </Container>
      </>
    );
  }
