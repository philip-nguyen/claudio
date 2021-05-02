import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import './custom.css'

const NavigationMenu = ({handleLogout}) => {
  return (
    <>
      <Navbar className = "color-nav" variant="light" expand="lg">
  <Navbar.Brand href="/home"><span className="navHome">ClAud-io</span></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/discover"><span className="navItem">Discover</span></Nav.Link>
      <Nav.Link href="/compositions"><span className="navItem">Composition</span></Nav.Link>
      <Nav.Link href="/sequence"><span className="navItem">Sequence</span></Nav.Link>
    </Nav>
    <Nav className="ml-auto">
    <Button variant="outline-success" onClick = {handleLogout}><span className="logoutItem">Logout</span></Button>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    </>
  );
};

export default NavigationMenu; 