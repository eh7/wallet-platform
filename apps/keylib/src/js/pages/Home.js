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
        <Container as="main" fluid="md" className="py-4 px-3 mx-auto">
         <Row>
           <Col>
             <NavMain />
	     <h1>Home</h1>
             <hr className="col-1 my-5 mx-0" />
           </Col>
         </Row>
        </Container>
      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
