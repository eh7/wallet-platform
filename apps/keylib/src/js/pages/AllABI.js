import React, { useState, useEffect } from 'react';
// import { useTable } from "react-table";
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
  Web3All,
  FormatAbi,
//  Logs,
//  GetAbi,
//  executeContractFunction,
//  contractData,
//  contractSetup,
} from '../services/web3All';

import {
  contracts,
  networks,
  networkBlockerUrls,
} from '../services/conf';

//import BlockTimestamp from "../components/BlockTimestamp";

const contractName = 'Properties';

let web3All = {};

const EventEmitter = require('events');
const myEmitter = new EventEmitter();

//const FunctionForm = (props) => {
//  return (
//    <div>FunctionFrom</div>
//  );
//}

const capitalize = (str) => {
  return str.charAt(0).toUpperCase()+str.slice(1);
}

const AllABI = (props) => {

  const [abiData, setAbiData] = useState({});
 
  const [contractFormData, setContractFormData] = useState({display:false});
  const [formData, setFormData] = useState({display:false});
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [showIndex, setShowIndex] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [eventLoading, setEventLoading] = useState(null);

  const [formFeedback, setFormFeedback] = useState('');

  const variantEventButton = [];

  async function handleEventLogs(e, index) {
    if (showLogs && index === showIndex) {
      setShowLogs(false);
      setShowIndex(null);
    } else {
      try {
        setEventLoading(index);
        const events = await web3All.Logs(web3All, eventTypes[index]);
        if (events.length > 0) {
          setLogs(events);
          console.log('logs:', events);
          //alert('handleEventLogs');
          setShowLogs(true);
          setShowIndex(index);
        } else {
          alert('No events logs for ' +  eventTypes[index].name);
        }
        setEventLoading(null);
      }
      catch (e) {
        console.log("try catch error in handleEventLogs:", e);
        setEventLoading(null);
      }
    }
  }

  function handleInputOnChangeBespokeContract (e, name, input) {
    e.preventDefault();
    if (name === 'contractAbi') {
      contractFormData[name] = JSON.parse(e.target.value);
    } else {
      contractFormData[name] = e.target.value;
    }
    setContractFormData(contractFormData);
  }

  async function handleSubmitBespokeContract (e) {
    e.preventDefault();
    // formData.contractAddress = input;
    // alert('handleSubmitBespokeContract');
    web3All.SetContractData(contractFormData);
    setAbiData(web3All);
    contractFormData.display = true;
    setContractFormData(contractFormData);
    const web3AllEventsData = web3All.GetEventsAbi(web3All)
    setEventTypes(web3AllEventsData);
    if (!await web3All.checkNetwork()) {
      await web3All.switchNetwork();
    }
    // setRerender(!rerender);
    // this.forceUpdate();
    console.log('handleSubmitBespokeContract :: formData', formData);
  }

  function handleInputOnChange(e, name, input) {
    e.preventDefault();
    formData.functionName = input;
    formData.values[name] = e.target.value;
    setFormData(formData);
  }
 
  async function handleSubmit(e, inputs, stateMutability) {
    e.preventDefault();

    try {
      await web3All.contractSetup(abiData);
      
      // Add other bespoke parts format formData.values
      inputs.map((item) => {
        if (item.type === "string[]") {
          formData.values[item.name] = JSON.parse(formData.values[item.name]);
        }
      });
console.log('ggggggggggggggggggggggggggggggg', inputs);
console.log('ggggggggggggggggggggggggggggggg', formData.values);

      const returnData = await web3All.executeContractFunction (formData.name, formData.values, inputs, stateMutability);
      console.log('executeContractFunction :: ', returnData);
      if (typeof returnData.transactionHash === 'undefined') {
        alert('executeContractFunction :: ' + returnData);
      } else {
        alert('executeContractFunction :: ' + returnData.transactionHash);
      }

      formData.values.role = '';
      formData.values.account = '';

      formData.display = false;
      setFormData(formData);

      //setFormFeedback(formData.values);
    } catch (e) {
      console.log("web3All :: handleSubmit :: error", e);
      alert("web3All :: handleSubmit :: error");
    }
  }

  useEffect(() => {
    async function setup () {
      web3All = new Web3All(props.contractName || contractName, formData);
      /*
      // metamask check for network and change - TODO handle Metamask???
      if (!await web3All.checkNetwork()) {
        await web3All.switchNetwork();
      }
      */
      setAbiData(web3All);
      const web3AllEventsData = web3All.GetEventsAbi(web3All)
      setEventTypes(web3AllEventsData);
    }
    setup();
    myEmitter.on('eventShowForm', (e) => {
      console.log('eventShowForm :: e', e.inputs);
      setFormData({
        display: true,
        name: e.name,
	inputs: e.inputs,
	stateMutability: e.stateMutability,
        values: { 
        },
      });
    });
    // setRerender(!rerender);
  }, [props]);

// console.log('process.argv', );
  if (props.contractName.search("Bespoke") === 0) {
    return (
      <div className="container mt-4 p-5 text-primary">
        <Card border="secondary" className="text-secondary">
          <Row>
          <Form onSubmit={(e) => handleSubmitBespokeContract(e)} className="p-5">
            <h3>Contract Settings Form</h3>
  	    <Form.Group className="mb-3" controlId="formBasicEmail">
  	      <Form.Label>
                Contract Address 
              </Form.Label>
  	      <Form.Control
                required
                name="contractAddress"
                onChange={(e) => handleInputOnChangeBespokeContract(e, 'contractAddress')}
                placeholder={"Enter " + 'contract address'}
              />
            </Form.Group>
  	    <Form.Group className="mb-3" controlId="formBasicEmail">
  	      <Form.Label>
                Contract ABI 
              </Form.Label>
  	      <Form.Control
                as="textarea"
                required
                name="contractAbi"
                onChange={(e) => handleInputOnChangeBespokeContract(e, 'contractAbi')}
                placeholder={"Enter " + 'contract abi'}
              />
            </Form.Group>
  	    <Form.Group className="mb-3" controlId="formBasicEmail">
  	      <Form.Label>
                Contract NetworkId 
              </Form.Label>
  	      <Form.Control
                required
                name="contractNetworkId"
                onChange={(e) => handleInputOnChangeBespokeContract(e, 'contractNetworkId')}
                placeholder={"Enter " + 'contract networkId'}
              />
            </Form.Group>
  	    <Form.Group className="mb-3" controlId="formBasicEmail">
  	      <Form.Label>
                Contract Creation Block Number 
              </Form.Label>
  	      <Form.Control
                required
                name="contractBlockNo"
                onChange={(e) => handleInputOnChangeBespokeContract(e, 'contractBlockNo')}
                placeholder={"Enter " + 'contract start block number'}
              />
            </Form.Group>
  	    <Button type='submit' variant="outline-primary">Submit</Button>
          </Form>
          </Row>

          {contractFormData.display && (
            <div>
            <Card.Header>
              <h5>Smart Contract</h5>
              Name: <h1>Bespoke Contract</h1>
  	      Address: <h5><a href={ "https://" + ((web3All.networkId) ? networkBlockerUrls[web3All.networkId] : 'mumbai.polygonscan.com') + "/address/" + contractFormData.contractAddress } target="_blank">{ contractFormData.contractAddress }</a></h5>
            </Card.Header>
            <Card.Header className="">
  	      <h5 className="float-end">Status:<br/>(connected)</h5>
  	      Blockchain Network: <h2>{ networks[contractFormData.contractNetworkId] }</h2>
	    </Card.Header>
            <Row>
  	      <Col>
	       LOGS {console.log('eventTypes', eventTypes)}
               {(!!eventTypes.length) && (
                 <p className="p-4">
                   <nav>
                     <h4>Contract Events</h4>
                     {
                       eventTypes.map((event,index) => {
                         variantEventButton[index] = "outline-primary";
                         return (
                           <Button
                             key={index}
                             onClick={(e) => handleEventLogs(e, index)}
                             type='button'
                             variant={variantEventButton[index]}
                           >
                             Logs {eventTypes[index].name} 
                             {
                               eventLoading === index 
                               ? <Badge
                                   bg="secondary"
                                 >
                                   <Spinner
                                     as="span"
                                     animation="border"
                                     size="sm"
                                     role="status"
                                     aria-hidden="true"
                                   />
                                 </Badge>   
                               : null
                             }
                           </Button>
                         );
                       })
                     }
                   </nav>
                 </p>
               )}
               {(showLogs) && (
  	         <div className="p-4">
                   <h3>{ logs[0].event } Events</h3>
                   <Table striped bordered hover>
                   { 
                     <thead>
                       <tr>
                         <th>Block No.</th>
                     { 
                       Object.keys(logs[0].args).map((header, index) => {
                         if (index >= logs[0].args.length) {
                           // console.log(header, index, logs[0].args.length); 
                           return (<th>{ capitalize(header) }</th>);
                         } else {
                           return '';
                         }
                       })
                     }
                       </tr>
                     </thead>
                   }
                   {
                     <tbody>
                     { logs.map((event) => {
                         const tds = event.args.map((item) => {
                           if (typeof item === 'object') {
                             return (<td>{item.toString()}</td>);
                           } else {
                            return (<td>{item}</td>);
                           }
                         })
                         const host = (web3All.networkId) ? networkBlockerUrls[web3All.networkId] : 'mumbai.polygonscan.com';
                         const blockTd = (<td><a href={"https://" + host + "/block/" + event.blockNumber} target="_blank" rel="noreferrer">{event.blockNumber}</a></td>);
                         return (<tr>{blockTd}{tds}</tr>);
                       })
                     }
                     </tbody>
                   }
                   </Table>
                 </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <FormatAbi
                  abi={contractFormData.contractAbi}
                  name={'Bespoke'}
                  address={contractFormData.contractAddress}
                  myEmitter={myEmitter}
                />
  	      </Col>
  	      <Col>
  	        {formData.display && (
  	          <Form onSubmit={(e) => handleSubmit(e, formData.inputs, formData.stateMutability)} className="p-5">
                    <h3>Function: { capitalize(formData.name) } ({ formData.stateMutability })</h3>
  		    { formData.inputs.map((input, index) => {
  	              // return (<p><input value={input.name} /></p>);
  	              return (
                        <Form.Group className="mb-3" controlId="formBasicEmail">
  	                  <Form.Label>
                            {capitalize(input.name)} ({input.type})
                          </Form.Label>
  		          <Form.Control
                            required
                            name={input.name}
                            value={formData.values[input.name]}
                            type={input.type}
                            onChange={(e) => handleInputOnChange(e, input.name, input)}
                            placeholder={"Enter " + input.name}
                          />
                        </Form.Group>
  		      );
  		    })}
  	            <Button type='submit' variant="outline-primary">Submit</Button>
  	          </Form>
  	        )}
  	      </Col>
            </Row>
            </div>
	  )}
        </Card>
      </div>
    );
	      //<p>addr: { contractFormData.contractAddress }</p>
	      //<p>abi: { contractFormData.contractAbi }</p>
	      //<p>networkId: { contractFormData.contractNetworkId }</p>
  } else {

console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx', abiData);
    return (
      <div className="container mt-4 p-5 text-primary">
        <Card border="secondary" className="text-secondary">
          <Card.Header>
            <h5>Smart Contract</h5>
            Name: <h1>{ abiData.contractName }</h1>
  	    Address: <h5><a href={ "https://" + ((web3All.networkId) ? networkBlockerUrls[web3All.networkId] : 'mumbai.polygonscan.com') + "/address/" + abiData.address } target="_blank">{ abiData.address }</a></h5>
  	  </Card.Header>
          <Card.Header className="">
  	  <h5 className="float-end">Status:<br/>(connected)</h5>
  	  Blockchain Network: <h2>{ networks[abiData.networkId] }</h2>
  	</Card.Header>
  	<Row>
  	  <Col>
              {(!!eventTypes.length) && (
                <p className="p-4">
                  <nav>
                  <h4>Contract Events</h4>
                  {
                    eventTypes.map((event,index) => {
                      variantEventButton[index] = "outline-primary";
                      return (
                        <Button
                          key={index}
                          onClick={(e) => handleEventLogs(e, index)}
                          type='button'
                          variant={variantEventButton[index]}
                        >
                          Logs {eventTypes[index].name} 
                          {
                            eventLoading === index 
                            ? <Badge
                                bg="secondary"
                              >
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              </Badge>   
                            : null
                          }
                        </Button>
                      );
                    })
                  }
                  </nav>
                </p>
              )}
              {(showLogs) && (
  	      <div className="p-4">
                  <h3>{ logs[0].event } Events</h3>
                  <Table striped bordered hover>
                  { 
                    <thead>
                      <tr>
                        <th>Block No.</th>
                    { 
                      Object.keys(logs[0].args).map((header, index) => {
                        if (index >= logs[0].args.length) {
                          // console.log(header, index, logs[0].args.length); 
                          return (<th>{ capitalize(header) }</th>);
                        } else {
                          return '';
                        }
                      })
                    }
                      </tr>
                    </thead>
                  }
                  {
                    <tbody>
                    { logs.map((event) => {
                        const tds = event.args.map((item) => {
                          if (typeof item === 'object') {
                            return (<td>{item.toString()}</td>);
                          } else {
                            return (<td>{item}</td>);
                          }
                        })
                        //const blockTd = (<td>{web3All.getBlockTimestampSync(event.blockNumber)}</td>);
                        const host = (web3All.networkId) ? networkBlockerUrls[web3All.networkId] : 'mumbai.polygonscan.com';
                        //const blockTd = (<td><a href={"https://mumbai.polygonscan.com/block/" + event.blockNumber} target="_blank" rel="noreferrer">{event.blockNumber}</a></td>);
                        const blockTd = (<td><a href={"https://" + host + "/block/" + event.blockNumber} target="_blank" rel="noreferrer">{event.blockNumber}</a></td>);
                        //const blockTd = (<td><a href={"https://rinkeby.etherscan.io/block/" + event.blockNumber} target="_blank" rel="noreferrer">{event.blockNumber}</a></td>);
                        return (<tr>{blockTd}{tds}</tr>);
                      })
                    }
                    </tbody>
                  }
                  </Table>
                </div>
              )}
  	  </Col>
  	</Row>
  	<Row>
  	  <Col>
              <FormatAbi
                abi={abiData.abi}
                name={abiData.contractName}
                address={abiData.address}
                myEmitter={myEmitter}
              />
  	  </Col>
  	  <Col>
  	    {formData.display && (
  	      <Form onSubmit={(e) => handleSubmit(e, formData.inputs, formData.stateMutability)} className="p-5">
  		<h3>Function: { capitalize(formData.name) } ({ formData.stateMutability })</h3>
  		{ formData.inputs.map((input, index) => {
  	          // return (<p><input value={input.name} /></p>);
  	          return (
  	            <Form.Group className="mb-3" controlId="formBasicEmail">
  	              <Form.Label>
                        {capitalize(input.name)} ({input.type})
                      </Form.Label>
  		      <Form.Control
                        required
                        name={input.name}
  			value={formData.values[input.name]}
                         type={input.type}
                         onChange={(e) => handleInputOnChange(e, input.name, input)}
                         placeholder={"Enter " + input.name}
                      />
                    </Form.Group>
  		  );
  		})}
  	        <Button type='submit' variant="outline-primary" id="submit-button">Submit</Button>
  	      </Form>
  	    )}
  	  </Col>
  	</Row>
        </Card>
      </div>
    );
  }
}

export default AllABI;
