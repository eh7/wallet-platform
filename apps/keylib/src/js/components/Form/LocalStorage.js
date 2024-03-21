import { useState, useEffect } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
 
import Wallet from '../../services/wallet';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption

import 'dotenv/config';

function LocalStorage(props) {

  const wallet = new Wallet();

  const [
    exportData,
    setExportData
  ] = useState({});

  const [
    validationMessage,
    setValidationMessage
  ] = useState(false);

  const [
    validationErrors,
    setValidationErrors
  ] = useState([]);

  useEffect(() => {
  }, [exportData]);

  const handleSave = async (event) => {
    event.preventDefault();
    const itemName = document.getElementById("formItemName").value;
    const localStorageObject = document.getElementById("formJSONObject").value;
    console.log('save item:');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (document.getElementById("submitButton").disabled) {
      alert("disabled");
      return;
    }

    document.getElementById("submitButton").disabled = true;

    const itemName = document.getElementById("formItemName").value;
    const localStorageObject = document.getElementById("formJSONObject").value;

    let data;

    // function TODO here
    console.log('itemName:', itemName);
    console.log('localStorageObject:', localStorageObject);

    
//    if (localStorageObject === '') {
      data = JSON.parse(localStorage.getItem(itemName));
      console.log('localStorage', data);
      document.getElementById("formJSONObject").value = data;
//    }

    document.getElementById("submitButton").disabled = false;
  };

  encrypt = (text, key) => {
    //const this_key = Buffer.from(process.env.KEY, 'hex');
    console.log(key.length, key);
    const this_key = Buffer.from(key, 'hex');
    //const this_iv = Buffer.from(process.env.IV, 'hex');
    const this_iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(this_key),
      this_iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      iv: this_iv.toString('hex'),
      encryptedData: encrypted.toString('hex')
    };
  }

  decrypt = (text, key) => {
    const this_key = Buffer.from(key, 'hex');
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    console.log(this_key.length, this_key);
    let decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(this_key),
      iv,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    const decrpted_object = JSON.parse(decrypted.toString('utf8'));

    console.log("networks", JSON.stringify(decrpted_object.networks));
    localStorage.setItem("networks", JSON.stringify(decrpted_object.networks));
    alert('set networks localStorage.setItem("networks", JSON.stringify(decrpted_object.networks))'); 

    console.log("keystore", JSON.stringify(decrpted_object.keystore));
    localStorage.setItem("keystore", JSON.stringify(decrpted_object.keystore));
    alert('set keystores localStorage.setItem("keystore", JSON.stringify(decrpted_object.networks))'); 

    wallet.initSetupWalletKeystore(key);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Local Storage</Card.Title>
          { (validationErrors.length > 0) &&
            <Card.Title className="mb-2 p-3 text-warning"> 
              Validation Error:
              <Alert key="warning" variant="warning">
                {validationErrors.map((error) => <div>{error}</div>)}
              </Alert>
            </Card.Title>
          }
          <Card.Text>
            <div>
            <Form onSubmit={handleSubmit}>

              <Container ref={el=>this.componentRef=el}>

                <div className="pt-3 text-primary h3">
                  JSON Object                     
                </div>

                <Row className="mb-0 pl-3 pt-3">
                  <div className="pt-3 text-primary h3">
                    Item Name 
                  </div>
                </Row>
                <Row className="mb-0 pl-3 pt-3">
                  <Form.Group className="mb-3 pr-3" controlId="formItemName">
                    <Form.Control
                      required
                      type="text"
                      placeholder="item name"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-0 pl-3 pt-3">
                  <textarea class="form-control" id="formJSONObject" rows="9"></textarea>
                </Row>

                <Row className="mb-0 pl-3 pt-3">
                  <Button variant="primary" type="submit" id="submitButton">
                    Submit
                  </Button>
                </Row>

              </Container>
            </Form>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default LocalStorage;
