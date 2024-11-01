import React, {useState} from 'react';
// import {createPortal} from 'react-dom';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import PasswordProtectedLink from './Comptonents/Pasword/PasswordProtectLink';
import MobileMenu from './Comptonents/Menu/MobileMenu';
import ComputerMenu from './Comptonents/Menu/ComputerMenu';
import LandscapeMenu from './Comptonents/Menu/LandscapeMenu.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.scss';
import logo from './Color-logo_2x-100-removebg-preview.png';
import Olymp from './OlympicComitet.jpg'
import wakoLogo from './Wako_page-0001-removebg-preview.png';
import EURWAKO from './EURWAKO.png';
import prifileIcon from './profile-icon.svg';
import list from './list.svg'
import list2 from './arrow-right-square-fill.svg'
import list3 from './arrow-left-square-fill.svg'
console.log(document.querySelector("#key"))

const Header = () => {
  const [landscapeMenuOpen, setLandscapeMenuOpen] = useState(false);
  const [menuChangeIcon, setMenuChangeIcon] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => {
    setLandscapeMenuOpen(false);
    setMenuChangeIcon()
    setMenuOpen(false);
  };

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
      <>
      <div>
        <div className='mobile-menu-background'></div>
      <div className="mobile-menu-icon" onClick={() => setLandscapeMenuOpen(!landscapeMenuOpen)}>
        <img src={list2} alt="Menu Icon" />
      </div>
      </div>
      <Navbar className='header-block' expand="md" bg="white" variant="light">
            <div className='header-bottom copmuter container-header'>
                {/* {createPortal(<Navbar.Brand/>, document.getElementById("key"))}; */}
              <div className='logos-block'>
              <Navbar.Brand href="/" className="LKFLOGO">
                  <img 
                  src={logo} 
                  alt="Logo"
                  height={60}
                  width={120}
                  className="d-inline-block align-top" 
                  />
              </Navbar.Brand>
              <Navbar.Brand  className="my-auto olymp-mobile">
                  <img 
                  src={Olymp} 
                  alt="Logo"
                  height={70}
                  width={70}
                  className="d-inline-block align-top olymp" 
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
              </div>
              <div in={menuOpen} id='responsive-navbar-nav' className="justify-content-center align-items-center">
                <div className="align-items-center computer">
                  <ComputerMenu/>
                </div>
                <div className="landscape-menu-icon" onClick={() => setLandscapeMenuOpen(!landscapeMenuOpen)}>
                <img src={list} alt="Menu Icon" />
              </div>
                <div className={`landscape-menu-wrapper ${landscapeMenuOpen ? 'open' : ''}`}>
                  <LandscapeMenu closeMenu={closeMenu} scrollToFooter={scrollToFooter} />
                  <div className={`mobile-menu-icon ${menuChangeIcon ? 'open' : ''}`} onClick={() => setLandscapeMenuOpen(!landscapeMenuOpen)}>
                    <img src={list3} alt="Menu Icon" />
                  </div>
                </div>

              </div>
              <div className='logos-block'>
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
              </div>
          </div>
      </Navbar>
      </>
    );
  }

export default Header;