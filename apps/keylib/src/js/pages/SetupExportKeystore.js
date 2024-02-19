import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Wallet from '../services/wallet';

export default class SetupExportKeystore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
    };
    this.state.wallet = new Wallet();
  }

  componentDidMount() {
  }

  getKeystore = async () => {
    console.log(await this.state.wallet.getKeystoreJson());
  }

  render() {
    return (
      <>
        <h1>SetupExportKeystore</h1>
        <p>
          {this.getKeystore()}
        </p>
      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
