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
          <Nav.Link href="Products">Products</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="About">About</Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}

export default NavMain;
