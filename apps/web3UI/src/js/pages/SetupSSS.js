import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import FromSSS from '../components/Form/SSS';
import SecureSharedSecret from '../components/Form/SecureSharedSecret';

import pageSetup from '../setup';

export default class SetupSSS extends React.Component {

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
        <h1>Secure Shared Secret Recover</h1>
        <p>
          <SecureSharedSecret 
            name={'SecureSharedSecret'}
            onUpdateArrayData={(e) => {
              //alert("SecureSharedSecret onUpdateArrayData :: " + e)
              //console.log("SecureSharedSecret onUpdateArrayData", e[0].value)
              //formData.values[input.name] = e;
              //setFormData(formData);
            }}
          />
        </p>
      </>
    );
  }
}
