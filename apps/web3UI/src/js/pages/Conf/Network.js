import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import FromSendTransaction from '../components/Form/SendTransaction';
import ConfNetwork from '../../components/Conf/Network';

import Wallet from '../../services/wallet';

//import { ethers } from "ethers";

//import 'dotenv/config';

export default class ConfNetwork extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      networks: [],
      provider: {},
      wallet: {},
    };
  }

  componentDidMount() {
    this.state.wallet = new Wallet();
    this.state.networks.push({
    })
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
          <Row>
            <h3>
              Network Configuration
            </h3>
          </Row>
          <Row>
            <p>Networks</p>
            {this.state.networks}
          </Row>
          <Row>
            <ConfNetwork type={this.props.type}/> 
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
