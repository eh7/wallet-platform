import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FromSendTransaction from '../components/FormSendTransaction';

import Wallet from '../services/wallet';

//import { ethers } from "ethers";

//import 'dotenv/config';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      provider: {},
      wallet: {},
    };
  }

  componentDidMount() {
    this.state.wallet = new Wallet();
  }

  componentDidUpdate() {
  }

  getAddress = async () => {
    alert(
      'address[0]: ' + await this.state.wallet.getAddress()
    );
  }

  render() {
    //const provider = new ethers.providers.JsonRpcProvider(endPoint);
    return (
      <>
        <Container>
          <Row><h1>Send Tx</h1></Row>
          <Row>
            <Button onClick={this.getAddress}>getAddress</Button> |
          </Row>
          <Row>
            <FromSendTransaction /> 
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
