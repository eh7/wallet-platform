import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Wallet from '../services/wallet';

export default class SetupAddress extends React.Component {

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

    document.title = `You clicked ${this.state.count} times`;

    //alert('componentDidMount')
  }

  componentDidUpdate() {
    
    document.title = `You clicked ${this.state.count} times`;

    //alert('componentDidUpdate')
  }

  getAddress = async () => {
    //alert(
    //  'address[0]: ' + await this.state.wallet.getAddress()
    //);
    return  await this.state.wallet.getAddress();
  }

  render() {
    return (
      <>
        <h1>Address</h1>

        {this.getAddress()}
        <Button onClick={this.getAddress}>getAddress</Button> |

      </>
    );
  }
}

//          <Card>
//            <Card.Body>
//            </Card.Body>
//          </Card>
