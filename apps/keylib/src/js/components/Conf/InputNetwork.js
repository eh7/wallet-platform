import { useState, useRef } from 'react';

const InputNetwork = ({ networks, setNetworks }) => {
    
    const inputNetworkRef = useRef(null)
    const inputIdRef = useRef(null)
    
    const handleSubmit = (evt) => {
        evt.preventDefault()
        setNetworks([...networks, inputNetworkRef.current.value ])
        inputNetworkRef.current.value = ''
    }
    
    const handleDelete = (networkToDelete) => {
        setNetworks(() => networks.filter((network) => network !== networkToDelete))
    }
    
    return(
        <div>
        <form onSubmit={(evt) => {handleSubmit(evt)}}>
            <input
            type='text'
            placeholder='network'
            ref={inputNetworkRef}
            />
            <input
            type='text'
            placeholder='id'
            ref={inputIdRef}
            />
            <button>add network</button>
        </form>
        <div className="network-list-container">
            {networks.length > 0 && networks.map((network)=> (
                <div className="network" key={network}>{network}
                    <button onClick={(evt) => {handleDelete(network)}}>X</button>
                </div>
            ))}
        </div>
        </div>
    )  
}
export default InputNetwork
