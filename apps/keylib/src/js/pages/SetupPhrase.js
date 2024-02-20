import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FormPhrase from "../components/FormPhrase";

//import Footer from "react-bootstrap/Footer";

//const display = "Hello, to Guru99 Tutorials";
//const h1tag =<h1>{display}</h1>;
//export default h1tag;

export default class SetupPhrase extends React.Component {
  render() {
    return (
      <>
        <h1>SetupPhrase</h1>
        <FormPhrase _subtitle={"Setup New Phrase"} />
      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
