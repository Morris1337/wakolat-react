import React, {useState} from 'react'
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import scrollToFooter from '../../Header.jsx'
import PasswordProtectedLink from '../Pasword/PasswordProtectLink';

export default function MobileMenu({ closeMenu, scrollToFooter }) {
  const [openFederacija, setOpenFederacija] = useState(false);
  const [openDokumenti, setOpenDokumenti] = useState(false);
  const [openKomisijas, setOpenKomisijas] = useState(false);

  const toggleFederacija = () => setOpenFederacija(!openFederacija);
  const toggleDokumenti = () => setOpenDokumenti(!openDokumenti);
  const toggleKomisijas = () => setOpenKomisijas(!openKomisijas);
  return (
    <div>
        <Nav.Link className='menu-link' onClick={closeMenu}>
            <Link to={'/main'}>Home</Link>
        </Nav.Link>

        <Nav.Link 
            className='menu-link click-open-submenu' 
            id='federacija' 
            // href='#' 
            onClick={toggleFederacija}
        >
            Federācija
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
                className="ul-header-dok submenu" onClick={closeMenu}>
                    <li className="li-header-item"><Link to={'/documents/noteikumi'} onClick={closeMenu}>Noteikumi</Link></li>
                    <li className="li-header-item"><Link to={'/documents/dopings'} onClick={closeMenu}>Dopings</Link></li>
                    <li className="li-header-item"><Link to={'/documents/gadaParaksti'} onClick={closeMenu}>Gada pārskati</Link></li>
                    <li className="li-header-item"><Link to={'/documents/kopsapulcesProtokoli'} onClick={closeMenu}>Kopsapulces протоколи</Link></li>
                    <li className="li-header-item"><Link to={'/documents/valdesSedesProtokoli'} onClick={closeMenu}>Valdes sēdes протоколи</Link></li>
                    <li className="li-header-item"><Link to={'/documents/budzets'} onClick={closeMenu}>Budžets</Link></li>
                    <li className="li-header-item"><Link to={'/documents/sacensibuRezultati'} onClick={closeMenu}>Notikušas sacensības</Link></li>
                </ul>
                )}
            </li>
            <li className="li-header-item"><Link to={"/Biedri"} onClick={closeMenu}>Biedri</Link></li>
            <li className="li-header-item"><Link to={"/Valde"} onClick={closeMenu}>Valde</Link></li>
            <li className="li-header-item" ><Link to={"/"} onClick={closeMenu}>LKF izlase</Link></li>
            <li className="li-header-item">
                <a onClick={toggleKomisijas} style={{ cursor: 'pointer' }}>Komisijas</a>
                {openKomisijas && (
                <ul className="ul-header-komis submenu">
                    <li className="li-header-item"><Link onClick={closeMenu}>Tiesnešu komisija</Link></li>
                    <li className="li-header-item"><Link onClick={closeMenu}>Ērikas komisija</Link></li>
                </ul>
                )}
            </li>
            </ul>
        )}

        <Nav.Link className='menu-link'><Link to={'/Kalendars'} style={{color: '#002e5b', textDecoration: 'none'}} onClick={closeMenu}>Kalendārs</Link></Nav.Link>
        <Nav.Link className='menu-link' ><Link to={"/Eksamenacija"} onClick={closeMenu}>Eksaminācija</Link></Nav.Link>
        <Nav.Link className='menu-link' onClick={scrollToFooter}>
            Kontakti
        </Nav.Link>
        <Nav.Link className='menu-link'>
            <PasswordProtectedLink>
            <Link to={'/admin'} onClick={closeMenu}></Link>
            </PasswordProtectedLink>
        </Nav.Link>
  </div>
  )
}
