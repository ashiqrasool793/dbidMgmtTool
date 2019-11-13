import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap'

class navBar extends Component {
    state = {  }
    render() { 
        return ( 
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">DBID Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/releases">Releases</Nav.Link>
            <Nav.Link href="/team">Team</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>)
      ;
    }
}
 
export default navBar;