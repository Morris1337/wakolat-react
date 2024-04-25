import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import logo from './Color-logo_2x-100-removebg-preview.png';

const Header = () => {
    return (
      <Navbar collapseOnSelect expand="md" bg="white" variant="light">
          <Container>
              <Navbar.Brand href="/" className="my-auto">
                  <img 
                  src={logo} 
                  alt="Logo"
                  height={50}
                  width={100}
                  className="d-inline-block align-top" 
                  />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav' className="justify-content-center align-items-center">
                  <Nav className="align-items-center">
                      <Nav.Link className='menu-link' href='/'>Home</Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Federacija</Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Kalendars</Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Eksaminacija</Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Kontakti</Nav.Link>
                  </Nav>
              </Navbar.Collapse>
              {/* <Navbar.Collapse>
              <Form inline className="search">
                      <FormControl
                          type='text'
                          placeholder='Search'
                          className='mr-sm-2'
                      />
                      <Button variant='outline-info' className='mr-2'>Search</Button>
                  </Form>
              </Navbar.Collapse> */}
          </Container>
      </Navbar>
    );
  }

export default Header;