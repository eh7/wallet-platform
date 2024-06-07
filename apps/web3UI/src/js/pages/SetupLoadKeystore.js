import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FromLoadKeystore from '../components/Form/LoadKeystore';

import pageSetup from '../setup';

export default class SetupLoadKeystore extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {};
    //this.handleClick = this.handleClick.bind(this);
    pageSetup();
  }

  render() {
    return (
      <>
        <h1>Setup Load Keystore</h1>
        <p>
          TODO add the form to grab password here and then submit and decrypt keystore file, then load into seedHex local storage....
          <FromLoadKeystore />
        </p>
      </>
    );
  }
}
