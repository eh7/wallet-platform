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

  const [showSeedHexForm, setShowSeedHexForm] = useState(false)
  const [showPhraseForm, setShowPhraseForm] = useState(false)
  const [showPhraseNewForm, setShowPhraseNewForm] = useState(false)
  
  const [
    networks,
    setNetworks
  ] = useState(storedNetworks)

  useEffect(() => {
    localStorage.setItem('networks', JSON.stringify(networks))
  })

  const handleShowSeedHexForm = () => {
    if (showSeedHexForm === false) {
      setShowSeedHexForm(true);
    } else {
      setShowSeedHexForm(false);
    }
  }

  const handleShowPhraseForm = () => {
    if (showPhraseForm === false) {
      setShowPhraseForm(true);
    } else {
      setShowPhraseForm(false);
    }
  }

  const handleShowPhraseNewForm = () => {
    if (showPhraseNewForm === false) {
      setShowPhraseNewForm(true);
    } else {
      setShowPhraseNewForm(false);
    }
  }

  return (
    <>
      <Card className="w-100">
        <Row className="mb-0 pl-3 pt-3">
          Choose key setup option: 
          <input type="submit" value="Toggle SeedHex Form" onClick={handleShowSeedHexForm} />
          <input type="submit" value="Toggle Phrase Form" onClick={handleShowPhraseForm} />
          <input type="submit" value="Toggle New Phrase Form" onClick={handleShowPhraseNewForm} />
        </Row>
        <Row className="mb-0 pl-3 pt-3">
          <h5>SeedHex</h5>
          { (showSeedHexForm) ? <SeedHex type='init'/> : null }
        </Row>
        <Row className="mb-0 pl-3 pt-3">
          <h5>Phrase</h5> 
          { (showPhraseForm) ? <Phrase type='init'/> : null }
        </Row>
        <Row className="mb-0 pl-3 pt-3">
          <h5>New Phrase</h5> 
          { (showPhraseNewForm) ? <Phrase _new="true" type='init'/> : null }
        </Row>
      </Card>
    </>
  );
}
/*
        <Row className="mb-0 pl-3 pt-3">
          Choose key setup option: 
          <input type="submit" value="SeedHex" onClick={setShowSeedHexForm(true)} />
          <input type="submit" value="Phrase" onClick={setShowPhraseForm(true)} />
        </Row>
*/
          //{ (showSeedHexForm) ? <SeedHex/> : null }
          //{ (showPhraseForm) ? <Phrase/> : null }

export default ConfPhraseSeedHex;
