import React, {useState} from 'react';
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
  const [openFederacija, setOpenFederacija] = useState(false);
  const [openDokumenti, setOpenDokumenti] = useState(false);
  const [openKomisijas, setOpenKomisijas] = useState(false);

  // Функции для переключения состояния
  const toggleFederacija = () => setOpenFederacija(!openFederacija);
  const toggleDokumenti = () => setOpenDokumenti(!openDokumenti);
  const toggleKomisijas = () => setOpenKomisijas(!openKomisijas);

    return (
      <Navbar expand="md" bg="white" variant="light">
            <Container className='header-bottom copmuter'>
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
              <Nav className="align-items-center computer">
                      <Nav.Link className='menu-link'><Link to={'/main'}>Home</Link></Nav.Link>
                      <Nav.Link className='menu-link click-open-submenu' id='federacija' href='/'>Federacija
                      <ul class="submenu">
                        <li id="liDoc" class="li-header-item"><Link to={'/Documents'}>Dokumenti</Link>
                            <ul class="submenu">
                                <li class="li-header-item"><Link to={'/documents/noteikumi'}>Noteikumi</Link></li>
                                <li class="li-header-item"><Link to={'/documents/dopings'}>Dopings</Link></li>
                                <li class="li-header-item"><Link to={'/documents/gadaParaksti'}>Gada pārskati</Link></li>
                                <li class="li-header-item"><Link to={'/documents/kopsapulcesProtokoli'}>Kopsapulces protokoli</Link></li>
                                <li class="li-header-item"><Link to={'/documents/valdesSedesProtokoli'}>Valdes sēdes protokoli</Link></li>
                                <li class="li-header-item"><Link to={'/documents/budzets'}>Budžets</Link></li>
                                <li class="li-header-item"><Link to={'/documents/sacensibuRezultati'}>Sacensību rezultāti</Link></li>
                                {/* <li class="li-header-item"><Link to={'/documents/reiting'}>Reitings</Link></li>                                                     */}
                            </ul>
                        </li>
                        <li class="li-header-item"><Link to={"/Biedri"}>Biedri</Link></li>
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
                      <Nav.Link className='menu-link'><Link to={'/Kalendars'} style={{color: '#002e5b', textDecoration: 'none'}}>Kalendars</Link></Nav.Link>
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

                <Nav className="align-items-center mobile">
                  <Nav.Link className='menu-link'>
                    <Link to={'/main'}>Home</Link>
                  </Nav.Link>

                  <Nav.Link 
                    className='menu-link click-open-submenu' 
                    id='federacija' 
                    href='#' 
                    onClick={toggleFederacija}
                  >
                    Federacija
                  </Nav.Link>

                  {openFederacija && (
                    <ul className="ul-header-fed submenu">
                      <li 
                      id="liDoc" 
                      className="li-header-item" 
                      onClick={toggleDokumenti}
                      >Dokumenti
                        {openDokumenti && (
                          <ul 
                          className="ul-header-dok submenu">
                            <li className="li-header-item"><Link to={'/documents/noteikumi'}>Noteikumi</Link></li>
                            <li className="li-header-item"><Link to={'/documents/dopings'}>Dopings</Link></li>
                            <li className="li-header-item"><Link to={'/documents/gadaParaksti'}>Gada pārskati</Link></li>
                            <li className="li-header-item"><Link to={'/documents/kopsapulcesProtokoli'}>Kopsapulces протоколи</Link></li>
                            <li className="li-header-item"><Link to={'/documents/valdesSedesProtokoli'}>Valdes sēdes протоколи</Link></li>
                            <li className="li-header-item"><Link to={'/documents/budzets'}>Budžets</Link></li>
                            <li className="li-header-item"><Link to={'/documents/sacensibuRezultati'}>Sacensību rezultāti</Link></li>
                          </ul>
                        )}
                      </li>
                      <li className="li-header-item"><Link to={"/Biedri"}>Biedri</Link></li>
                      <li className="li-header-item"><a className="li-header-link" href="valde.html">Valde</a></li>
                      <li className="li-header-item"><a className="li-header-link" href="lkfIzlase.html">LKF izlase</a></li>
                      <li className="li-header-item">
                        <a onClick={toggleKomisijas} style={{ cursor: 'pointer' }}>Komisijas</a>
                        {openKomisijas && (
                          <ul className="ul-header-komis submenu">
                            <li className="li-header-item"><a className="li-header-link" href="">Tiesnešu komisija</a></li>
                            <li className="li-header-item"><a className="li-header-link" href="">Ērikas komisija</a></li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  )}

<Nav.Link className='menu-link'><Link to={'/Kalendars'} style={{color: '#002e5b', textDecoration: 'none'}}>Kalendars</Link></Nav.Link>
                  <Nav.Link className='menu-link' href='/'>Eksaminacija</Nav.Link>
                  <Nav.Link className='menu-link' href='/'>Kontakti</Nav.Link>
                  <Nav.Link className='menu-link'>
                    <PasswordProtectedLink>
                      <Link to={'/admin'}></Link>
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