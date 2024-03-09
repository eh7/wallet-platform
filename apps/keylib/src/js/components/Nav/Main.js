import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';

import NavDropdown from 'react-bootstrap/NavDropdown';

import {
  DropdownSubmenu,
  NavDropdownMenu,
} from "react-bootstrap-submenu";

function NavMain() {
  return (
    <Container as="main" className="py-4 px-3 mx-auto">
      <Navbar className="rounded mb-0">
        <Row className="w-100">
          <Navbar.Brand className="w-100" href="#home">Crypto Wallet Interface</Navbar.Brand>
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
