import { useState, useEffect } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Phrase from '../../components/Form/Phrase';
import SeedHex from '../../components/Form/SeedHex';

import Wallet from '../../services/wallet';

function ConfPhraseSeedHex({_subtitle, _new, type}) {

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
        <h5>SeedHex</h5>
        <SeedHex/>
        </Row>
        <Row>
          <h3>Or</h3>
        </Row>
        <Row className="mb-0 pl-3 pt-3">
        <h5>Phrase</h5>
        <Phrase/>
        </Row>
      </Card>
    </>
  );
}

export default ConfPhraseSeedHex;
