import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {
  DropdownSubmenu,
  NavDropdownMenu,
} from "react-bootstrap-submenu";

import Wallet from '../../services/wallet';

import SetMyNetwork from '../Form/SetMyNetwork';

function NavAlert(props) {

  const wallet = props.wallet;

  const [show, setShow] = useState(false);
  const [network, setNetwork] = useState(
    JSON.parse(
      localStorage.getItem('network')
    )
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    //console.log('useEffect:', myAddress, myBalance, myNetwork);
    console.log('useEffect :: show :: ', show);
  });//, []);

  const networkCallback = (e) => {
    // the event context comes from the Child
    //this.setState({ count: this.state.count++ });
    console.log('networkCallback', e);
    setNetwork(e);
    props.updateNetwork(e);
  }

  const bodyContent = () => {
    return(<h1>bodyContent</h1>);
  }

  if (props.action === 'showData') {
    return (
      <>

        <Button variant="link" onClick={handleShow}>
          {props.action}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="Modal_Default_header" closeButton>
            <Modal.Title>{props.heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.text}{bodyContent}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  else if (props.action === 'setNetwork') {
    return (
      <>

        <Button variant="link" onClick={handleShow}>
          'Set Network'
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="Modal_Default_header" closeButton>
            <Modal.Title>Set My Network</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SetMyNetwork wallet={props.wallet} networkCallback={networkCallback}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <h6>no 'action' set {props.action}</h6>
      </>
    );
  }

  /*
  return (
    <Container as="main" className="py-4 px-3 mx-auto">

      <Row className="w-100">
        <Col sm="7">
          <Navbar className="rounded mb-0">
            <Navbar.Brand href="/">Crypto Wallet Interface</Navbar.Brand>
           </Navbar>
        </Col>
        <Col sm="5" className="small text-muted">
          address: {myAddress}<br/>
          network: {(myNetwork !== '') ? ({myNetwork}) : (<Button variant="link" onClick={() => alert(true)}>Set</Button>)}
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
  */
}

export default NavAlert;
      //<div className="block-example border border-primary">
      //<div className="block-example rounded mb-0 border-primary">
      //<Modal className="Modal_Default" show={show} onHide={handleClose}>
