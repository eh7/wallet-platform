import { useState } from 'react';

import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
 
import ReactToPrint from 'react-to-print';

import Wallet from '../services/wallet';

function FormPhrase({_subtitle}) {

//  const [validated, setValidated] = useState(false);

  const wallet = new Wallet();

  const [wordCount, setWordCount] = useState(12);

  const getFormWordInputs = (_wordCount) => {
    let content = [];
    for (let i = 0; i < _wordCount; i++) {
      const item = i;
      const controlId = "formWordInput" + i;
      const displayCount= i + 1;
      const lable = "Word " + displayCount;
      const placeholder = "enter word " + displayCount;
      content.push(
        <Form.Group className="mb-3 p-2" controlId={controlId}>
          <Form.Control
            required
            type="text"
            placeholder={placeholder}
          />
        </Form.Group>
      );
    }
    return content;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("handleSubmit");
    const form = event.currentTarget;

    const words = [];
    for(let i = 1; i <= form[0].value; i++) {
     words.push(form[i].value);
    }
    wallet.saveNewPhraseSeed(words);

//    if (form.checkValidity() === false) {
//      event.preventDefault();
//      event.stopPropagation();
//    }
//
//    setValidated(true);
  };

  const handleSelectChage = (e) => {
    if (e.currentTarget.value) {
      getFormWordInputs(e.currentTarget.value);
      setWordCount(e.currentTarget.value);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Secret Phrase Form</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {_subtitle}
          </Card.Subtitle>
          <Card.Text>
            <div>
            <Form onSubmit={handleSubmit}>

              <Container ref={el=>this.componentRef=el}>

                <div className="pt-3 text-primary h3">
                  Secret Phrase                    
                </div>

                <Form.Group className="mb-3 pl-3 pt-4" controlId="formSelectNumberWords">
                  <Form.Label>Number of words</Form.Label>
                    <Form.Select aria-label="Select Number of Words" onChange={handleSelectChage}>
                      <option value="12">12</option>
                      <option value="16">16</option>
                      <option value="24">24</option>
                    </Form.Select>
                </Form.Group>

                <Row className="mb-3">
                  {getFormWordInputs(wordCount)}
                </Row>
              </Container>
              <Row className="pl-3 pb-3 pt-0">

              <ReactToPrint
                trigger={() => {
                  return(<Button  variant="link">print phrase</Button>)
                }}
                content={() => this.componentRef}
                documentTitle="Secret Phrase"
                pageStyle="print"
              />
              </Row>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );

/*
  return (
    <Card>
      <Card.Body>
        <Card.Title>Secret Phrase Form</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
         {_subtitle}
        </Card.Subtitle>
        <Card.Text>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
*/
}

export default FormPhrase;
