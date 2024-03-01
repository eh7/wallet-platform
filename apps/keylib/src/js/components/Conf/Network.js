import { useState, useEffect } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import InputNetwork from './InputNetwork';
 
import Wallet from '../../services/wallet';

function ConfNetowrk({_subtitle, _new}) {

  const wallet = new Wallet();

  let storedNetworks = JSON.parse(localStorage.getItem('networks'))

  if (storedNetworks === null) {
    storedNetworks = []
  }
  
  const [
    networks,
    setNetworks
  ] = useState(storedNetworks)

  useEffect(() => {
    localStorage.setItem('networks', JSON.stringify(networks))
  })

  return (
    <>
      <Card className="w-100">
        <Row className="mb-0 pl-3 pt-3">
          <Button variant="link" type="submit" className="w-100">
            add network
          </Button>
          <InputNetwork networks={networks} setNetworks={setNetworks}/>
        </Row>
      </Card>
    </>
  );
}

export default ConfNetowrk;

/*

                <Row className="mb-0 pl-3 pt-3">
                  <div className="pt-3 text-primary h3">
                    Chain ID
                  </div>
                </Row>
                <Row className="mb-0 pl-3 pt-3">
                  <Form.Group className="mb-3 pr-3" controlId="formNetworChainId>
                    <Form.Control
                      required
                      type="text"
                      placeholder="1"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-0 pl-3 pt-3">
                  <div className="pt-3 text-primary h3">
                    Currency symbol
                  </div>
                </Row>
                <Row className="mb-0 pl-3 pt-3">
                  <Form.Group className="mb-3 pr-3" controlId="formNetworkSymbol>
                    <Form.Control
                      required
                      type="text"
                      placeholder="ETH"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-0 pl-3 pt-3">
                  <div className="pt-3 text-primary h3">
                    Block explorer URL
                  </div>
                </Row>
                <Row className="mb-0 pl-3 pt-3">
                  <Form.Group className="mb-3 pr-3" controlId="formNetworkBlockExplore>
                    <Form.Control
                      required
                      type="text"
                      placeholder="https://etherscan.io"
                    />
                  </Form.Group>
                </Row>
###
*/
