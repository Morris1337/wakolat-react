// src/Comptonents/Menu/ResponsiveMenu.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PasswordProtectedLink from "../Pasword/PasswordProtectLink";
import "./menu.scss";

export default function ResponsiveMenu({ onContactScroll }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState({
    federacija: false,
    dokumenti: false,
    komisijas: false,
  });

  const location = useLocation();
  const overlayRef = useRef(null);

  // Закрывать меню при смене маршрута
  useEffect(() => {
    setMobileOpen(false);
    setOpen({ federacija: false, dokumenti: false, komisijas: false });
  }, [location.pathname]);

  // Блокируем прокрутку body при открытом мобильном меню
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }));
  const closeAll = () =>
    setOpen({ federacija: false, dokumenti: false, komisijas: false });

  const handleContact = (e) => {
    e.preventDefault();
    if (onContactScroll) onContactScroll();
    setMobileOpen(false);
    closeAll();
  };

  return (
    <nav
      className={`site-menu ${mobileOpen ? "is-open" : ""}`}
      aria-label="Primary"
    >
      {/* Верхняя полоса (справа — десктоп-меню, слева — бургер для мобилы) */}
      <div className="menu__bar">
        <button
          className="menu__burger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="menu-panel"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="menu__burger-line" />
          <span className="menu__burger-line" />
          <span className="menu__burger-line" />
        </button>

        <ul className="menu__list menu__list--desktop" role="menubar">
          <li role="none" className="menu__item">
            <Link role="menuitem" className="menu__link" to="/main">
              Home
            </Link>
          </li>

          <li role="none" className="menu__item menu__item--has-sub">
            <button
              type="button"
              className="menu__link menu__link--button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Federācija
            </button>

            {/* mega-submenu (показывается по hover в CSS) */}
            <div className="submenu" role="menu">
              <div className="submenu__col">
                <span className="submenu__title">Dokumenti</span>
                <ul className="submenu__list">
                  <li>
                    <Link to="/documents/noteikumi" className="submenu__link">
                      Noteikumi
                    </Link>
                  </li>
                  <li>
                    <Link to="/documents/likUnDoc" className="submenu__link">
                      Likumi un dokumenti
                    </Link>
                  </li>
                  <li>
                    <Link to="/documents/dopings" className="submenu__link">
                      Dopings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/gadaParaksti"
                      className="submenu__link"
                    >
                      Gada pārskati
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/kopsapulcesProtokoli"
                      className="submenu__link"
                    >
                      Kopsapulces protokoli
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/valdesSedesProtokoli"
                      className="submenu__link"
                    >
                      Valdes sēdes protokoli
                    </Link>
                  </li>
                  <li>
                    <Link to="/documents/budzets" className="submenu__link">
                      Budžets
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/sacensibuRezultati"
                      className="submenu__link"
                    >
                      Notikušās sacensības
                    </Link>
                  </li>
                  <li>
                    <Link to="/documents/sacensibas" className="submenu__link">
                      Sacensības
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/sportistuRegistrs"
                      className="submenu__link"
                    >
                      Sportistu reģistrs
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="submenu__col">
                <span className="submenu__title">Par federāciju</span>
                <ul className="submenu__list">
                  <li>
                    <Link to="/Biedri" className="submenu__link">
                      Biedri
                    </Link>
                  </li>
                  <li>
                    <Link to="/Valde" className="submenu__link">
                      Valde
                    </Link>
                  </li>
                  <li>
                    <a href="/lkfIzlase.html" className="submenu__link">
                      LKF izlase
                    </a>
                  </li>
                  <li>
                    <Link to="/Tiesniesi" className="submenu__link">
                      Tiesniesi
                    </Link>
                  </li>
                  <li className="submenu__group">
                    <span className="submenu__title">Komisijas</span>
                    <ul className="submenu__list">
                      <li>
                        <a href="#" className="submenu__link">
                          Tiesnešu komisija
                        </a>
                      </li>
                      <li>
                        <a href="#" className="submenu__link">
                          Ētikas komisija
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li role="none" className="menu__item">
            <Link role="menuitem" className="menu__link" to="/Kalendars">
              Kalendārs
            </Link>
          </li>
          <li role="none" className="menu__item">
            <Link role="menuitem" className="menu__link" to="/Eksamenacija">
              Eksaminācija
            </Link>
          </li>
          <li role="none" className="menu__item">
            <a role="menuitem" className="menu__link" href="#contact" onClick={handleContact}>
              Kontakti
            </a>
          </li>

          <li role="none" className="menu__item menu__item--icon">
            <PasswordProtectedLink />
          </li>
        </ul>
      </div>

      {/* Мобильная панель */}
      <div id="menu-panel" className="menu-panel" aria-hidden={!mobileOpen}>
        <ul className="menu__list menu__list--mobile">
          <li className="menu__item">
            <Link className="menu__link" to="/main">Home</Link>
          </li>

          <li className={`menu__item ${open.federacija ? "is-open" : ""}`}>
            <button
              className="menu__link menu__link--button"
              onClick={() => toggle("federacija")}
              aria-expanded={open.federacija}
            >
              Federācija
            </button>

            <div className="panel" style={{ maxHeight: open.federacija ? 800 : 0 }}>
              <button
                className="submenu__link submenu__link--button"
                onClick={() => toggle("dokumenti")}
                aria-expanded={open.dokumenti}
              >
                Dokumenti
              </button>

              <div className="panel" style={{ maxHeight: open.dokumenti ? 600 : 0 }}>
                <ul className="panel__list">
                  <li><Link to="/documents/noteikumi" className="submenu__link">Noteikumi</Link></li>
                  <li><Link to="/documents/likUnDoc" className="submenu__link">Likumi un dokumenti</Link></li>
                  <li><Link to="/documents/dopings" className="submenu__link">Dopings</Link></li>
                  <li><Link to="/documents/gadaParaksti" className="submenu__link">Gada pārskati</Link></li>
                  <li><Link to="/documents/kopsapulcesProtokoli" className="submenu__link">Kopsapulces protokoli</Link></li>
                  <li><Link to="/documents/valdesSedesProtokoli" className="submenu__link">Valdes sēdes protokoli</Link></li>
                  <li><Link to="/documents/budzets" className="submenu__link">Budžets</Link></li>
                  <li><Link to="/documents/sacensibuRezultati" className="submenu__link">Notikušās sacensības</Link></li>
                  <li><Link to="/documents/sacensibas" className="submenu__link">Sacensības</Link></li>
                  <li><Link to="/documents/sportistuRegistrs" className="submenu__link">Sportistu reģistrs</Link></li>
                </ul>
              </div>

              <button
                className="submenu__link submenu__link--button"
                onClick={() => toggle("komisijas")}
                aria-expanded={open.komisijas}
              >
                Komisijas
              </button>

              <div className="panel" style={{ maxHeight: open.komisijas ? 300 : 0 }}>
                <ul className="panel__list">
                  <li><a href="#" className="submenu__link">Tiesnešu komisija</a></li>
                  <li><a href="#" className="submenu__link">Ētikas komisija</a></li>
                </ul>
              </div>

              <ul className="panel__list">
                <li><Link to="/Biedri" className="submenu__link">Biedri</Link></li>
                <li><Link to="/Valde" className="submenu__link">Valde</Link></li>
                <li><a href="/lkfIzlase.html" className="submenu__link">LKF izlase</a></li>
                <li><a href="/tiesniesi.html" className="submenu__link">Tiesneši</a></li>
              </ul>
            </div>
          </li>

          <li className="menu__item">
            <Link className="menu__link" to="/Kalendars">Kalendārs</Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/Eksamenacija">Eksaminācija</Link>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#contact" onClick={handleContact}>Kontakti</a>
          </li>
          <li className="menu__item menu__item--icon">
            <PasswordProtectedLink />
          </li>
        </ul>
      </div>

      {/* Оверлей для закрытия меню кликом мимо */}
      {mobileOpen && (
        <button
          ref={overlayRef}
          className="menu__overlay"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
}
