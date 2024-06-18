import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import FromSSS from '../components/Form/SSS';
import SecureSharedSecretGenerator from '../components/Form/SecureSharedSecretGenerator';

import pageSetup from '../setup';

export default class SetupSSSGenerator extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {};
    //this.handleClick = this.handleClick.bind(this);
    pageSetup();
  }

  render() {
            //type={'String'}
    return (
      <>
        <h1>Secure Shared Secret Generator</h1>
        <p>
          <SecureSharedSecretGenerator 
            name={'SecureSharedSecretGenerator'}
            onUpdateArrayData={(e) => {
              //alert("SecureSharedSecretGenerator onUpdateArrayData :: " + e)
              //console.log("SecureSharedSecretGenerator onUpdateArrayData", e[0].value)
              //formData.values[input.name] = e;
              //setFormData(formData);
            }}
          />
        </p>
      </>
    );
  }
}
