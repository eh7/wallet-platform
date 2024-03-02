import { useState, useRef } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const InputNetwork = ({ networks, setNetworks }) => {
    
    const inputNetworkRef = useRef(null)
    const inputIdRef = useRef(null)
    const inputRpcUrlRef = useRef(null)
    const inputSymbolRef = useRef(null)
    const inputExplorerRef = useRef(null)
    
    const handleSubmit = (evt) => {
        evt.preventDefault()
        //setNetworks([...networks, inputNetworkRef.current.value ])
        setNetworks([...networks, {
          name: inputNetworkRef.current.value,
          chainId: inputIdRef.current.value,
          rpcUrl: inputRpcUrlRef.current.value,
          symbol: inputSymbolRef.current.value,
          explorer: inputExplorerRef.current.value,
        }])
        inputNetworkRef.current.value = ''
    }
    
    const handleDelete = (networkToDelete) => {
        setNetworks(() => networks.filter((network) => network !== networkToDelete))
    }
    
    return(
        <div>
        <form onSubmit={(evt) => {handleSubmit(evt)}}>
            <input
              className="w-20"
              required
              type='text'
              placeholder='network name'
              ref={inputNetworkRef}
            />
            <input
              className="w-20"
              required
              type='text'
              placeholder='chain id'
              ref={inputIdRef}
            />
            <input
              className="w-20"
              required
              type="text"
              placeholder="rpc url"
              ref={inputRpcUrlRef}
            />
            <input
              className="w-20"
              required
              type="text"
              placeholder="symbol"
              ref={inputSymbolRef}
            />
            <input
              className="w-20"
              required
              type="text"
              placeholder="exporer url"
              ref={inputExplorerRef}
            />
            <button>add network</button>
        </form>
        <div className="network-list-container">
            {networks.length > 0 && networks.map((network)=> (
                <div className="network" key={network.name}>
                  <Row>
                    <Col>
                     {(network.name) ? network.name : network}
                    </Col>
                    <Col>
                     {(network.chainId) ? network.chainId : 'no value'}
                    </Col>
                    <Col>
                      <button onClick={(evt) => {handleDelete(network)}}>X</button>
                    </Col>
                  </Row>
                </div>
            ))}
        </div>
        </div>
    )  
}
export default InputNetwork

/*
                <div className="network" key={network}>{network}
                    <button onClick={(evt) => {handleDelete(network)}}>X</button>
                </div>
                    <Col>
                     {(network.rpcUrl) ? network.rpcUrl : 'no value'}
                    </Col>
                    <Col>
                     {(network.symbol) ? network.symbol : 'no value'}
                    </Col>
                    <Col>
                     {(network.explorer) ? network.explorer : 'no value'}
                    </Col>
*/
