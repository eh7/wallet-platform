import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
//import Footer from "react-bootstrap/Footer";
//
import NavMain from '../components/NavMain';

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Container as="main" className="py-4 px-3 mx-auto">
          <NavMain />
          <h1>Products</h1>
          <hr className="col-1 my-5 mx-0" />
        </Container>
      </>
    );
  }
