import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import NavDropdown from 'react-bootstrap/NavDropdown';

import {
  DropdownSubmenu,
  NavDropdownMenu,
} from "react-bootstrap-submenu";

function NavMain() {
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
          <NavDropdown.Item href="/config/network">Network</NavDropdown.Item>
          <DropdownSubmenu href="#action/3.7" title="Text to show">
            <NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
          </DropdownSubmenu>
        </Nav.Item>
      </Nav>
      <Navbar>
        <Navbar.Brand href="#home">Crypto Wallet Interface</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">test</Nav.Link>
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
    </Container>
  );
}

export default NavMain;
