import React from 'react';
import {createPortal} from 'react-dom';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PasswordProtectedLink from './Comptonents/Pasword/PasswordProtectLink';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.scss';
import logo from './Color-logo_2x-100-removebg-preview.png';
import wakoLogo from './Wako_page-0001-removebg-preview.png';
import prifileIcon from './profile-icon.svg';
console.log(document.querySelector("#key"))

const Header = () => {
    return (
      <Navbar expand="md" bg="white" variant="light">
            <Container className='header-bottom'>
                {/* {createPortal(<Navbar.Brand/>, document.getElementById("key"))}; */}
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
                      <Nav.Link className='menu-link' id='federacija' href='/'>Federacija
                      <ul class="submenu">
                        <li id="liDoc" class="li-header-item"><Link to={'/Documents'}>Dokumenti</Link>
                            <ul class="submenu">
                                <li class="li-header-item"><Link to={'/Noteikumi'}>Noteikumi</Link></li>
                                <li class="li-header-item"><Link to={'/Dopings'}>Dopings</Link></li>
                                <li class="li-header-item"><Link to={'/GadaParaksti'}>Gada pārskati</Link></li>
                                <li class="li-header-item"><a class="li-header-link" href="doc.html?data-index=3" data-index="3">Kopsapulces protokoli</a></li>
                                <li class="li-header-item"><a class="li-header-link" href="doc.html?data-index=4" data-index="4">Valdes sēdes protokoli</a></li>
                                <li class="li-header-item"><a class="li-header-link" href="doc.html?data-index=5" data-index="5">Budžets</a></li>
                                <li class="li-header-item"><a class="li-header-link" href="doc.html?data-index=6" data-index="6">Sacensību rezultāti</a></li>
                                <li class="li-header-item"><a class="li-header-link" href="doc.html?data-index=7" data-index="7">Reitings</a></li>                                                    
                            </ul>
                        </li>
                        <li class="li-header-item"><a class="li-header-link" href="biedri.html">Biedri</a></li>
                        <li class="li-header-item"><a class="li-header-link" href="valde.html">Valde</a></li>
                        <li class="li-header-item"><a class="li-header-link" href="lkfIzlase.html">LKF izlase</a></li>
                        <li class="li-header-item"><a class="li-header-link" href="tiesniesi.html">Tiesneši</a></li>
                        <li id="komis" class="li-header-item"><a class="li-header-link" href="">Komisijas</a>
                            <ul class="ul-header-komis submenu">
                                <li class="li-header-item"><a class="li-header-link" href="">Tiesnešu komisija</a></li>
                                <li class="li-header-item"><a class="li-header-link" href="">Ērikas komisija</a></li>
                            </ul>
                        </li>
                    </ul>
                      </Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Kalendars</Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Eksaminacija</Nav.Link>
                      <Nav.Link className='menu-link' href='/'>Kontakti</Nav.Link>
                        <Nav.Link className='menu-link'>
                        <PasswordProtectedLink>
                        <Link
                        to={'/admin'}
                        >
                        </Link>  
                        </PasswordProtectedLink>
                        </Nav.Link>
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