import React, { useState } from "react";

import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  capitalize,
} from "../../utils";

import secrets from "secrets.js-grempe";

//const SecureSharedSecretGenerator = () => {
function SecureSharedSecretGenerator(props) {

  let latestId = 1;

  const [error, setError] = useState('');
  const [shares, setShares] = useState([]);
  const [key, setKey] = useState('testing');
  const [threshold, setThreshold] = useState(2);
  const [needed, setNeeded] = useState(10);

  const [inputs, setInputs] = useState([
    { id: latestId, value: "" }
  ]);

  function handleInputOnChange(e, index) {
    const value = e.target.value;



     /*
    const newInputs = Object.assign([], inputs);
    inputs[index].value = value;
    setInputs(newInputs);
    props.onUpdateArrayData(inputs);

    const shares = inputs.map((item) => {
      return item.value;
    });

    try {
      let chk = threshold;
      shares.map((item) => {
        if (item === '') {
          chk--
        }
      })
      if (chk === threshold) {
        const key = secrets.combine(shares);
        setKey(key)
      }
    } catch (e) {
      console.log("ERORR :: ", e)
    }
    */
  }

  return (
    <div>
      <div>
        { (error !== '') && 
          <div>Error: {error}</div>
        }
        <div>Key: {key}</div>
        <div>Threshold: {threshold}</div>
        <div>Shares Needed: {needed}</div>
        <div>
          <Form.Control
            required
            key={'key'}
            value={key}
            onChange={(e) => {
              setKey(e.target.value)
              //setShares = secrets.share(key, needed, threshold)
            }}
            placeholder={"Enter secret key"}
          />
        </div>
        <div>
          <Form.Control
            required
            key={'threshold'}
            value={threshold}
            onChange={(e) => {
              setThreshold(e.target.value)
              //setShares = secrets.share(key, needed, threshold)
            }}
            placeholder={"Enter secret key"}
          />
        </div>
        <div>
          <Form.Control
            required
            key={'needed'}
            value={needed}
            onChange={(e) => {
              setNeeded(e.target.value)
              //setShares = secrets.share(key, needed, threshold)
            }}
            placeholder={"Enter secret key"}
          />
        </div>
        <Button
          type='button'
          variant="outline-primary"
          onClick={(e) => {
            try {
              setError("")
              const thisKey = Buffer.from(
                key
              ).toString('hex')
              console.log(thisKey, needed, threshold)
              setShares(secrets.share(
                thisKey,
                Number(needed),
                Number(threshold)
              ))
              //setShares(secrets.share(key, needed, threshold))
              console.log('shares', shares)
            }  catch (e) {
              console.log('Error generateShares', key, needed, threshold, e.message)
              setError(e.message)
            }
          }}
        >generate shares</Button>
      </div>
      <div>
        <div>Shares:</div>
        <ul>
        { shares.map((item, index) => (
          <li>{item}</li>
        ))}
        </ul>
      </div>
    </div>
  );
      //<div>{JSON.stringify(inputs, null, 2)}</div>
      //{
      //  <ul> { shares.map((item) => {
      //        <li>{item}</li>
      //      })
      //    }
      //  <ul>
     // }
};

export default SecureSharedSecretGenerator;
