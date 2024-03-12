import { useState, useEffect } from 'react';

import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';

import NavDropdown from 'react-bootstrap/NavDropdown';

//import styled from 'styled-components';

import {
  DropdownSubmenu,
  NavDropdownMenu,
} from "react-bootstrap-submenu";

import Wallet from '../../services/wallet';

import NavAlert from './Alert';

/*
const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;
*/

function NavMain() {

  const wallet = new Wallet();

  //const [showSetNetwork, setShowSetNetwork] = useState(false);
  //const renderBackdrop = (props) => <Backdrop {...props} />;

  const [myAddress, setMyAddress] = useState('');
  const [myBalance, setMyBalance] = useState('');
  const [myNetwork, setMyNetwork] = useState('');

  const getAddress = async () => {
    const address = await wallet.getAddress();
    setMyAddress(
      address
    );
    console.log(myAddress);
  }

  const setNetwork = (chainId) => {
    const networks = JSON.parse(localStorage.getItem('networks'));
    localStorage.setItem('myNetwork', chainId);
    console.log('Main.js :: setNetwork :: chainId ::', chainId);      
    //setMyNetwork(networks[chainId].name);
  }

  const selectNetwork = async () => {
    alert('selectNetwork');
//    const networks = JSON.parse(localStorage.getItem('networks'));
//    networks.map((_network, _i) => {
//      console.log('----------------> getNetwork :: chainId ::', _network.chainId);      
//    });
  }

  useEffect(() => {
    console.log('useEffect:', myAddress, myBalance, myNetwork);
  }, [myAddress, myBalance, myNetwork]);

  getAddress();
  
  const updateNetwork = (e) => {
    const networks = JSON.parse(localStorage.getItem('networks'));
    //console.log('updateNetwork', e);
    //console.log('zzzzzzzzzzzz', networks[e]);
    //alert('TODO WIP :: updateNetwork in Main.js');
    setNetwork(e.chainId);
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', networks[e].chainId);
    //setMyNetwork(networks[e].name);
    console.log(networks[e].name);
  }

  const text = () => {
    return (
      <>
        <h6>this is some text.</h6>
      </>
    );
  }

  return (
    <Container as="main" className="py-4 px-3 mx-auto">

      <NavAlert wallet={wallet} action="setNetwork" heading="setNetwork Heading" text="setNetwork text"/>
      <NavAlert wallet={wallet} action="showData" heading="showData Heading" text="showData text"/>

      <Row className="w-100">
        <Col sm="7">
          <Navbar className="rounded mb-0">
            <Navbar.Brand href="/">Crypto Wallet Interface</Navbar.Brand>
           </Navbar>
        </Col>
        <Col sm="5" className="small text-muted">
          address: {myAddress}<br/>
          network: {(myNetwork !== '') ? ({myNetwork}) : (<Button variant="link" onClick={() => alert(true)}>Set</Button>)}
          <NavAlert wallet={wallet} action="setNetwork" heading="setNetwork" text="setNetwork" updateNetwork={updateNetwork}/>
        </Col>
      </Row>

      <div>
        <Navbar>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav variant="tabs" className="w-100" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/applications">Applications</Nav.Link>
              </Nav.Item>
              <Nav.Item>
               <Nav.Link href="/about">About</Nav.Link>
             </Nav.Item>
             <Nav.Item>
                <Nav.Link href="/send">Send Tx</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <NavDropdownMenu title="Setup" id="setup-nav-dropdown">
                  <NavDropdown.Item href="/setup">Setup Overview</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/phrase">New Phrase</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/phrase/import">Load Phrase</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/keystore/load">Load Keystore</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/import/keystor">Import Keystore</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/address">Address</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/export/data">Export Application Data</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/import/data">Import Application Data</NavDropdown.Item>
                </NavDropdownMenu>
              </Nav.Item>

              <Nav.Item className="ml-auto">
                <Nav.Link href="/config/network">Network</Nav.Link>
              </Nav.Item>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    </Container>
  );

  /*
  return (
    <Container as="main" className="py-4 px-3 mx-auto">
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/applications">Applications</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/send">Send Tx</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/setup">Setup</Nav.Link>
        </Nav.Item>
        <Nav.Item className="ml-auto">
          <Nav.Link href="/config/network">Network</Nav.Link>
        </Nav.Item>
      </Nav>

      <Navbar className="rounded mb-0">
        <Row className="w-100">
          <Navbar.Brand className="w-100" href="#home">Crypto Wallet Interface</Navbar.Brand>
        </Row>
        <Row className="w-100">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/applications">Applications</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/send">Send Tx</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/setup">Setup</Nav.Link>
            </Nav.Item>
            <Nav.Item className="ml-auto">
              <Nav.Link href="/config/network">Network</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
      </Navbar>

      <div>
        <Navbar>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav variant="tabs" className="w-100" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/applications">Applications</Nav.Link>
              </Nav.Item>
              <Nav.Item>
               <Nav.Link href="/about">About</Nav.Link>
             </Nav.Item>
             <Nav.Item>
                <Nav.Link href="/send">Send Tx</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="/setup">Setup</Nav.Link>
                <NavDropdownMenu title="setup" id="setup-nav-dropdown">
                  <NavDropdown.Item href="/setup">Setup ....</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/phrase">Setup Phrase.</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/phrase">Adress</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/keystore/load">load Keystore</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/import/keystor">import Keystore</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/address">address</NavDropdown.Item>
                  <NavDropdown.Item href="/setup/export/data">export app data</NavDropdown.Item>
                </NavDropdownMenu>
              </Nav.Item>

              <Nav.Item className="ml-auto">
                <Nav.Link href="/config/network">Network</Nav.Link>
              </Nav.Item>
              <NavDropdownMenu title="Dropdown 1" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <DropdownSubmenu href="#action/3.7" title="Text to show">
                  <NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
                  <DropdownSubmenu href="#action/3.7" title="Text to show">
                    <NavDropdown.Item href="#action/9.1">
                      Sub 2
                    </NavDropdown.Item>
                  </DropdownSubmenu>
                </DropdownSubmenu>
              </NavDropdownMenu>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    </Container>
  );
  */
}

export default NavMain;
      //<div className="block-example border border-primary">
      //<div className="block-example rounded mb-0 border-primary">
