import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";

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
          <Nav.Link href="/setup">Setup</Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}

export default NavMain;
