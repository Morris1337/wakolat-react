import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import logo from './Color-logo_2x-100-removebg-preview.png';
import wakoLogo from './Wako_page-0001-removebg-preview.png';
import prifileIcon from './profile-icon.svg'

const Header = () => {
    return (
      <Navbar expand="md" bg="white" variant="light">
            <Container className='header-bottom'>
              <Navbar.Brand href="/" className="my-auto">
                  <img 
                  src={logo} 
                  alt="Logo"
                  height={60}
                  width={120}
                  className="d-inline-block align-top" 
                  />
              </Navbar.Brand>
              <Navbar.Toggle 
                aria-controls='responsive-navbar-nav' 
                className='mobile-menu' 
                />
              <Navbar.Collapse id='responsive-navbar-nav' className="justify-content-center align-items-center">
                  <Nav className="align-items-center">
                      <Nav.Link className='menu-link' href='/'>Home</Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Federacija</Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Kalendars</Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Eksaminacija</Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Kontakti</Nav.Link>
                      <Nav.Link className='menu-link'><img 
                  src={prifileIcon} 
                  alt="Logo"
                  height={20}
                  width={20}
                  className="d-inline-block align-top" 
                  /></Nav.Link>
                  </Nav>
              </Navbar.Collapse>
              <Navbar.Brand href="https://wako.sport/" className="my-auto">
                  <img 
                  src={wakoLogo} 
                  alt="Logo"
                  height={70}
                  width={70}
                  className="d-inline-block align-top" 
                  />
                </Navbar.Brand>
          </Container>
      </Navbar>
    );
  }

export default Header;