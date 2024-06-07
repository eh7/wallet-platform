import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FormPhrase from "../components/Form/Phrase";
import FormPassword from "../components/Form/Password";

import pageSetup from '../setup';

export default class SetupPassword extends React.Component {

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
        <h1>SetupPassword</h1>
        <FormPassword _new={this.state._new} />
      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
