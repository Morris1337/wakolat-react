import React, {useState} from 'react';
// import {createPortal} from 'react-dom';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import PasswordProtectedLink from './Comptonents/Pasword/PasswordProtectLink';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.scss';
import logo from './Color-logo_2x-100-removebg-preview.png';
import Olymp from './OlympicComitet.jpg'
import wakoLogo from './Wako_page-0001-removebg-preview.png';
import EURWAKO from './EURWAKO.png';
import prifileIcon from './profile-icon.svg';
import MobileMenu from './Comptonents/Menu/MobileMenu';
console.log(document.querySelector("#key"))

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const scrollToFooter = () => {
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
      
    }
  };

  const handleClick = (event) => {
    if (window.innerWidth < 820) {
      event.preventDefault();
    } else {
      navigate('/Documents');
    }
  };

  const handleLinkClick = (event) => {
  const contact = document.getElementById('contact');

  if (window.innerWidth < 820) {
    event.preventDefault();
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' }); // Прокрутка к контактам на маленьких экранах
    }
  } else {
    navigate('/Documents'); // Переход на страницу для больших экранов
  }
};

    return (
      <Navbar expand="md" bg="white" variant="light">
            <Container className='header-bottom copmuter'>
                {/* {createPortal(<Navbar.Brand/>, document.getElementById("key"))}; */}
              <Navbar.Brand href="/" className="LKFLOGO">
                  <img 
                  src={logo} 
                  alt="Logo"
                  height={60}
                  width={120}
                  className="d-inline-block align-top" 
                  />
              </Navbar.Brand>
              <Navbar.Brand href="/" className="eur-wako">
                  <img 
                  src={EURWAKO} 
                  alt="EWako"
                  height={60}
                  width={120}
                  className="d-inline-block align-top" 
                  />
              </Navbar.Brand>
              <Navbar.Toggle 
                aria-controls='responsive-navbar-nav'
                className='mobile-menu mobile-menu-toggle'
                onClick={() => setMenuOpen(!menuOpen)} // Переключение состояния меню
                />
              <Navbar.Collapse in={menuOpen} id='responsive-navbar-nav' className="justify-content-center align-items-center">
              <Nav className="align-items-center computer">
                      <Nav.Link className='menu-link'><Link to={'/main'} onClick={closeMenu}>Home</Link></Nav.Link>
                      <Nav.Link className='menu-link click-open-submenu' id='federacija' onClick={closeMenu}>Federācija
                      <ul class="submenu">
                        <li id="liDoc" class="li-header-item"><Link onClick={handleClick}>Dokumenti</Link>
                            <ul class="submenu lidoc-sub">
                                <li class="li-header-item"><Link to={'/documents/noteikumi'} onClick={closeMenu}>Noteikumi</Link></li>
                                <li class="li-header-item"><Link to={'/documents/dopings'} onClick={closeMenu}>Dopings</Link></li>
                                <li class="li-header-item"><Link to={'/documents/gadaParaksti'} onClick={closeMenu}>Gada pārskati</Link></li>
                                <li class="li-header-item"><Link to={'/documents/kopsapulcesProtokoli'} onClick={closeMenu}>Kopsapulces protokoli</Link></li>
                                <li class="li-header-item"><Link to={'/documents/valdesSedesProtokoli'} onClick={closeMenu}>Valdes sēdes protokoli</Link></li>
                                <li class="li-header-item"><Link to={'/documents/budzets'} onClick={closeMenu}>Budžets</Link></li>
                                <li class="li-header-item"><Link to={'/documents/sacensibuRezultati'} onClick={closeMenu}>Notikušās sacensības</Link></li>
                                {/* <li class="li-header-item"><Link to={'/documents/reiting'}>Reitings</Link></li>                                                     */}
                            </ul>
                        </li>
                        <li class="li-header-item" onClick={closeMenu}><Link to={"/Biedri"} onClick={closeMenu}>Biedri</Link></li>
                        <li class="li-header-item"><Link to={"/Valde"} onClick={closeMenu}>Valde</Link></li>
                        <li class="li-header-item"><a class="li-header-link" href="lkfIzlase.html" onClick={closeMenu}>LKF izlase</a></li>
                        <li class="li-header-item"><a class="li-header-link" href="tiesniesi.html" onClick={closeMenu}>Tiesneši</a></li>
                        <li id="komis" class="li-header-item"><a class="li-header-link" href="" onClick={closeMenu}>Komisijas</a>
                            <ul class="ul-header-komis submenu">
                                <li class="li-header-item"><a class="li-header-link" href="" onClick={closeMenu}>Tiesnešu komisija</a></li>
                                <li class="li-header-item"><a class="li-header-link" href="" onClick={closeMenu}>Ētikas komisija</a></li>
                            </ul>
                        </li>
                    </ul>
                      </Nav.Link>
                      <Nav.Link className='menu-link'><Link to={'/Kalendars'} style={{color: '#002e5b', textDecoration: 'none'}}>Kalendārs</Link></Nav.Link>
                      <Nav.Link className='menu-link' ><Link to={"/Eksamenacija"} onClick={closeMenu}>Eksaminācija</Link></Nav.Link>
                      <Nav.Link className='menu-link' onClick={scrollToFooter}>
                      Kontakti
                  </Nav.Link>
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
                    <MobileMenu closeMenu={closeMenu} scrollToFooter={scrollToFooter} />
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
                <Navbar.Brand  className="my-auto olymp">
                  <img 
                  src={Olymp} 
                  alt="Logo"
                  height={70}
                  width={70}
                  className="d-inline-block align-top olymp" 
                  />
                </Navbar.Brand>
                <Navbar.Brand href="/" className="eur-wako-mobile">
                  <img 
                  src={EURWAKO} 
                  alt="Logo"
                  height={60}
                  width={120}
                  className="d-inline-block align-top" 
                  />
              </Navbar.Brand>
          </Container>
      </Navbar>
    );
  }

export default Header;