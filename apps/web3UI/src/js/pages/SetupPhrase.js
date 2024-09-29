import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FormPhrase from "../components/Form/Phrase";

import pageSetup from '../setup';

//import Footer from "react-bootstrap/Footer";

//const display = "Hello, to Guru99 Tutorials";
//const h1tag =<h1>{display}</h1>;
//export default h1tag;

        //<FormPhrase _subtitle={"Setup New Phrase"} _new={true} />

export default class SetupPhrase extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { _new: props._new };
    //this.handleClick = this.handleClick.bind(this);
    pageSetup();
  }

  render() {
    return (
      <>
        <h1>SetupPhrase</h1>
        <FormPhrase _new={this.state._new} />
      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
