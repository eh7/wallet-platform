import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Wallet from '../services/wallet';

import pageSetup from '../setup';

export default class SetupAddress extends React.Component {

  constructor(props) {
    super(props);
    const wallet = new Wallet();
    const address = this.getAddress(wallet)
    this.state = {
      address,
      count: 0,
      provider: {},
      isLoading: true,
      wallet,
    };
    pageSetup();
  }

  componentDidMount() {
    //const address = await this.wallet.getAddress();
    //this.state.address = address;
    //this.state.isLoading = false;
    //this.setState(this.state);
  }

  componentDidUpdate() {
  }

  getAddress = async (wallet) => {
    //alert(
    //  'address[0]: ' + await this.state.wallet.getAddress()
    //);
    const address = await wallet.getAddress();
    this.state.address = address;
    this.state.isLoading = false;
    this.setState(this.state);
    //return address;
  }

  render() {
    return (
      <>
        {(!this.state.isLoading) ? (
          <h6>Address: {this.state.address}</h6>
        ) : (<h6>Loading</h6>)}
      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
