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

//const SecureSharedSecret = () => {
function SecureSharedSecret(props) {

  let latestId = 1;

  const [key, setKey] = useState("Not Set");
  const [threshold, setThreshold] = useState(1);

  const [inputs, setInputs] = useState([
    { id: latestId, value: "" }
  ]);

  function handleInputOnChange(e, index) {
    const value = e.target.value;
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
        const comb = secrets.combine(shares);
        const key = Buffer.from(comb, 'hex').toString()
        setKey(key)
      }
    } catch (e) {
      console.log("ERORR :: ", e)
    }
  }

  return (
    <div>
      <div>
        <div>Key: {key}</div>
        <div>Threshold: {threshold}</div>
        <Button
          type='button'
          variant="outline-primary"
          onClick={() => {
            const newInputs = Object.assign([], inputs);
            latestId++;
            const id = latestId;
            newInputs.push({
              id,
              value: '',
            })
            setInputs(newInputs);
            setThreshold(newInputs.length);
          }}
        >add</Button>
      </div>
      {inputs.map((input, index) => {
        return (
          <div key={input.id}>
            <Form.Control
              required
              key={inputs[index].id}
              value={inputs[index].value}
              onChange={(e) => handleInputOnChange(e, index)}
              placeholder={"Enter value " + index}
            />
          </div>
        );
      })}
      {
        (inputs.length > 1) &&
        <Button
          type='button'
          variant="outline-primary"
           onClick={() => {
            //alert('x button clicked')
            const newInputs = Object.assign([], inputs);
            newInputs.pop();
            setInputs(newInputs);
            setThreshold(newInputs.length);
          }}
        >remove item</Button>
      }
    </div>
  );
      //<div>{JSON.stringify(inputs, null, 2)}</div>
};

export default SecureSharedSecret;
