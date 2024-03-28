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

function ConfNetowrk({_subtitle, _new, type}) {

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
          <InputNetwork networks={networks} setNetworks={setNetworks} type={type}/>
        </Row>
      </Card>
    </>
  );
}

export default ConfNetowrk;
