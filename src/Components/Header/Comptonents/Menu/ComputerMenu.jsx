import React, {useState} from 'react'
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import PasswordProtectedLink from '../Pasword/PasswordProtectLink';

// import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../App.scss';

export default function ComputerMenu() {
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
    <div className="align-items-center computer">                      
    <Nav.Link className='menu-link'><Link to={'/main'} onClick={closeMenu}>Home</Link></Nav.Link>
    <Nav.Link className='menu-link click-open-submenu' id='federacija' onClick={closeMenu}>Federācija
    <ul class="submenu">
      <li id="liDoc" class="li-header-item"><Link onClick={handleClick}>Dokumenti</Link>
          <ul class="submenu lidoc-sub">
              <li class="li-header-item"><Link to={'/documents/noteikumi'} onClick={closeMenu}>Noteikumi</Link></li>
              <hr className='verical-line'/>
              <li class="li-header-item"><Link to={'/documents/likUnDoc'} onClick={closeMenu}>Likumi un dokumenti</Link></li>
              <hr className='verical-line'/>
              <li class="li-header-item"><Link to={'/documents/dopings'} onClick={closeMenu}>Dopings</Link></li>
              <hr className='verical-line'/>
              <li class="li-header-item"><Link to={'/documents/gadaParaksti'} onClick={closeMenu}>Gada pārskati</Link></li>
              <hr className='verical-line'/>
              <li class="li-header-item"><Link to={'/documents/kopsapulcesProtokoli'} onClick={closeMenu}>Kopsapulces protokoli</Link></li>
              <hr className='verical-line'/>
              <li class="li-header-item"><Link to={'/documents/valdesSedesProtokoli'} onClick={closeMenu}>Valdes sēdes protokoli</Link></li>
              <hr className='verical-line'/>
              <li class="li-header-item"><Link to={'/documents/budzets'} onClick={closeMenu}>Budžets</Link></li>
              <hr className='verical-line'/>
              <li class="li-header-item"><Link to={'/documents/sacensibuRezultati'} onClick={closeMenu}>Notikušās sacensības</Link></li>
              <hr className='verical-line'/>
              <li class="li-header-item"><Link to={'/documents/sacensibas'} onClick={closeMenu}>Sacensibas</Link></li>
              <hr className='verical-line'/>
              <li class="li-header-item"><Link to={'/documents/sportistuRegistrs'}>Sportistu reģistrs</Link></li>                                                    
          </ul>
      </li>
      <hr className='verical-line'/>
      <li class="li-header-item" onClick={closeMenu}><Link to={"/Biedri"} onClick={closeMenu}>Biedri</Link></li>
      <hr className='verical-line'/>
      <li class="li-header-item"><Link to={"/Valde"} onClick={closeMenu}>Valde</Link></li>
      <hr className='verical-line'/>
      <li class="li-header-item"><a class="li-header-link" href="lkfIzlase.html" onClick={closeMenu}>LKF izlase</a></li>
      <hr className='verical-line'/>
      <li class="li-header-item"><a class="li-header-link" href="tiesniesi.html" onClick={closeMenu}>Tiesneši</a></li>
      <hr className='verical-line'/>
      <li id="komis" class="li-header-item"><a class="li-header-link" href="" onClick={closeMenu}>Komisijas</a>
          <ul class="ul-header-komis submenu">
              <li class="li-header-item"><a class="li-header-link" href="" onClick={closeMenu}>Tiesnešu komisija</a></li>
              <hr className='verical-line'/>
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
      </div>
  )
}
