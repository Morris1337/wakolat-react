import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PasswordProtectedLink from '../Pasword/PasswordProtectLink';
import logo from '../../Color-logo_2x-100-removebg-preview.png';

export default function LandscapeMenu({ closeMenu, scrollToFooter }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [isDocumentiVisible, setIsDocumentiVisible] = useState(false);
  const [isKomisVisible, setIsKomisVisible] = useState(false);
  const [landscapeMenuOpen, setLandscapeMenuOpen] = useState(false);

  // Обработчик клика на "Federācija"
  const handleFederacijaToggle = () => {
    setIsSubmenuVisible(prevState => !prevState);
    setIsDocumentiVisible(false); // Закрываем подменю документов при открытии федерации
    setIsKomisVisible(false);
  };

  // Обработчик клика на "Dokumenti"
  const handleDocumentiToggle = (e) => {
    e.stopPropagation(); // Останавливаем событие, чтобы не закрывалось подменю федерации
    setIsDocumentiVisible(prevState => !prevState);
  };

  const handleKomisToggle = (e) =>{
    e.stopPropagation();
    setIsKomisVisible(prevState => !prevState);
  }

  // Закрываем все подменю при клике на любой элемент меню
  const handleLinkClick = () => {
    setIsSubmenuVisible(false);
    setIsDocumentiVisible(false);
    setIsKomisVisible(false)
    closeMenu();
  };

  return (
    <div className={`align-items-center landscape ${landscapeMenuOpen ? 'open' : ''}`}>
      <Navbar.Brand href="/" className="LKFLOGO">
          <img 
          src={logo} 
          alt="Logo"
          height={60}
          width={120}
          className="d-inline-block align-top" 
          />
      </Navbar.Brand>
      <Nav.Link className='menu-link'>
        <Link to={'/main'} onClick={handleLinkClick}>Home</Link>
      </Nav.Link>
      <Nav.Link className='menu-link' id='federacija' onClick={handleFederacijaToggle}>
        <Link>Federācija</Link>
        <ul className={`more-menus submenu ${isSubmenuVisible ? 'open' : ''}`}>
          <li id="liDoc" className="li-header-item">
            <Link to="#" onClick={handleDocumentiToggle}>Dokumenti</Link>
            <ul className={`submenu ${isDocumentiVisible ? 'open' : ''}`}>
              <li className="li-header-item">
                <Link to={'/documents/noteikumi'} onClick={handleLinkClick}>Noteikumi</Link>
              </li>
              <li className="li-header-item">
                <Link to={'/documents/dopings'} onClick={handleLinkClick}>Dopings</Link>
              </li>
              <li className="li-header-item">
                <Link to={'/documents/gadaParaksti'} onClick={handleLinkClick}>Gada pārskati</Link>
              </li>
              <li className="li-header-item">
                <Link to={'/documents/kopsapulcesProtokoli'} onClick={handleLinkClick}>Kopsapulces protokoli</Link>
              </li>
              <li className="li-header-item">
                <Link to={'/documents/valdesSedesProtokoli'} onClick={handleLinkClick}>Valdes sēdes protokoli</Link>
              </li>
              <li className="li-header-item">
                <Link to={'/documents/budzets'} onClick={handleLinkClick}>Budžets</Link>
              </li>
              <li className="li-header-item">
                <Link to={'/documents/sacensibuRezultati'} onClick={handleLinkClick}>Notikušās sacensības</Link>
              </li>
            </ul>
          </li>
          <li className="li-header-item" onClick={handleLinkClick}>
            <Link to={"/Biedri"}>Biedri</Link>
          </li>
          <li className="li-header-item" onClick={handleLinkClick}>
            <Link to={"/Valde"}>Valde</Link>
          </li>
          <li className="li-header-item">
            <Link className="li-header-link" href="lkfIzlase.html" onClick={handleLinkClick}>LKF izlase</Link>
          </li>
          <li className="li-header-item">
            <Link className="li-header-link" href="tiesniesi.html" onClick={handleLinkClick}>Tiesneši</Link>
          </li>
          <li id="komis" class="li-header-item"><Link to='#' class="li-header-link" onClick={handleKomisToggle}>Komisijas</Link>
          <ul class={`ul-header-komis submenu ${isKomisVisible ? 'open' : ''}`}>
              <li class="li-header-item"><a class="li-header-link" href="" onClick={handleLinkClick}>Tiesnešu komisija</a></li>
              <li class="li-header-item"><a class="li-header-link" href="" onClick={handleLinkClick}>Ētikas komisija</a></li>
          </ul>
      </li>
        </ul>
      </Nav.Link>
      
      <Nav.Link className='menu-link'>
        <Link to={'/Kalendars'} onClick={handleLinkClick}>Kalendārs</Link>
      </Nav.Link>
      <Nav.Link className='menu-link' onClick={handleLinkClick}>
        <Link>Eksaminācija</Link>
      </Nav.Link>
      <Nav.Link className='menu-link' onClick={scrollToFooter}>
        <Link>Kontakti</Link>
      </Nav.Link>
      
      <div className='menu-link'>
        <PasswordProtectedLink>
          <Link to={'/admin'} onClick={handleLinkClick}>Admin</Link>
        </PasswordProtectedLink>
      </div>
    </div>
  );
}
