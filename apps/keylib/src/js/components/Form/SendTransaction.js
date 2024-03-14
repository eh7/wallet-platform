import { useState, useEffect } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
 
import Wallet from '../../services/wallet';

function FormSendTransaction({_subtitle, _new}) {

//  const [validated, setValidated] = useState(false);

  const wallet = new Wallet();

  const [networks, setNetworks] = useState(
    JSON.parse(
      localStorage.getItem('networks')
    )
  );

  const [
    network,
    setNetwork,
  ] = useState(
    JSON.parse(
      localStorage.getItem('network')
    )
  );

  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  const [
    validationMessage,
    setValidationMessage
  ] = useState(false);

  const [
    validationErrors,
    setValidationErrors
  ] = useState([]);

  useEffect(() => {
    console.log('useEffect:', network);
    getBalance();
  }, [network]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //alert("handleSubmit");
    //setValidationMessage(false);
    //setValidationErrors([]);

    const form = event.currentTarget;

    const from = await wallet.getAddress();
    const to = document.getElementById("formTo").value;
    const amount = document.getElementById("formAmount").value;

    const params = [{
      from: from,
      to: to,
      value: amount
    }];
console.log(params);

    wallet.sendTx(params);

//    const transactionHash = await provider.send('eth_sendTransaction', params)
//    console.log('transactionHash is ' + transactionHash);

    /*
    const password = document.getElementById("formPassword")
    const passwordCheck = document.getElementById("formPasswordCheck")
//console.log(password.value, " -- ", passwordCheck.value);
//console.log(password.value.length);
    
    if (!password.value) {
      validationErrors.push("Enter a value for Password");
      setValidationMessage(true);
    }

    if (validationErrors.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return null;
    }

    wallet.getKeystoreWithPassword(password.value);
    */
  };

  const getBalance = async () => {
    const address = await wallet.getAddress();
    const balance = await wallet.getBalance(address);
    setAddress(address);
    setBalance(balance);
    //alert(address + ' :: ' + balance);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Send Transaction Form</Card.Title>
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
                  Send Transaction
                </div>

                <div className="pt-3 text-secondary h6">
                  {(network.name) ? (<p>
                    <p>network: {network.name}</p>
                    <p>address: {address}</p>
                    <p>balance: {balance}</p>
                  </p>) : (<p>No Network Selected</p>)} 
                </div>

                <Row className="mb-0 pl-3 pt-3">
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label>Select Network to Send Tx</Form.Label>
                    <Form.Control
                      as="select"
                      value={network}
                      onChange={e => {
                        if (e.target.value !== '') {
                          setNetwork(networks[e.target.value]);
                        }
                      }}
                    >
                      <option value="">Select Network</option>
                      {networks.map((_network, _index) => {
                        return (<option value={_index}>{_network.name}</option>)
                      })}
                    </Form.Control>
                  </Form.Group>
                </Row>

                <Row className="mb-0 pl-3 pt-3">
                  <div className="pt-3 text-primary h3">
                    To 
                  </div>
                </Row>
                <Row className="mb-0 pl-3 pt-3">
                  <Form.Group className="mb-3 pr-3" controlId="formTo">
                    <Form.Control
                      required
                      type="text"
                      placeholder="To"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-0 pl-3 pt-3">
                  <div className="pt-3 text-primary h3">
                    Amount
                  </div>
                </Row>
                <Row className="mb-0 pl-3 pt-3">
                  <Form.Group className="mb-3 pr-3" controlId="formAmount">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Amount"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-0 pl-3 pt-3">
                  <Button variant="primary" type="submit">
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

export default FormSendTransaction;
