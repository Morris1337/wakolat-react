import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../../../profile/Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import PasswordProtectedLink from "../Pasword/PasswordProtectLink";
import "./fcmenu.scss";
import list2 from '../../arrow-right-square-fill.svg'
import Acc from './icons/accountLog.svg'
import AccIn from './icons/accountIn.svg'

const MenuIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.5" y="1.5" width="21" height="21" rx="6" ry="6" opacity="0.15" />
    <line x1="6" y1="8" x2="18" y2="8" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="6" y1="16" x2="18" y2="16" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.5" y="1.5" width="21" height="21" rx="6" ry="6" opacity="0.15" />
    <line x1="8" y1="8" x2="16" y2="16" />
    <line x1="16" y1="8" x2="8" y2="16" />
  </svg>
);

export default function FCMenu({ onContactScroll }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deskOpen, setDeskOpen] = useState(false);
  const [open, setOpen] = useState({
    federacija: false,
    dokumenti: false,
    komisijas: false,
  });
   const isAuthenticated =
    !!user ||
    (localStorage.getItem("accessToken") && localStorage.getItem("userId"));

  const handleAccountClick = () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      navigate(`/account/profile/${userId}`);
    } else {
      navigate("/login");
      // если хочешь модалку — тут openModal()
    }
  };

  const location = useLocation();
  const overlayRef = useRef(null);

  // helper: закрыть всё, вообще всё
  const closeAllAccordions = () => {
    setOpen({ federacija: false, dokumenti: false, komisijas: false });
  };

  const hardCloseMenu = () => {
    setMobileOpen(false);
    setDeskOpen(false);
    closeAllAccordions();
  };

  // каждый раз когда маршрут меняется -> закрываем
  useEffect(() => {
    hardCloseMenu();
  }, [location]);

  // блокируем прокрутку body когда моб. меню открыто
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [mobileOpen]);

  // esc закрывает
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        hardCloseMenu();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // аккордеоны мобилки
  const toggle = (key) =>
    setOpen((p) => ({ ...p, [key]: !p[key] }));

  // клик по "Контакты"
  const handleContact = (e) => {
    e.preventDefault();
    if (onContactScroll) onContactScroll();
    hardCloseMenu();
  };

  // клик по любой ссылке меню (десктоп или мобилка)
  const handleNavClick = () => {
    hardCloseMenu();
  };

  return (
    <nav
      className={`fc-menu ${mobileOpen ? "is-open" : ""}`}
      aria-label="Primary"
    >
      {/* TOP BAR */}
      <div className="fc-menu__bar">
        {/* БУРГЕР */}
        <button className="fc-menu__burger" onClick={() => setMobileOpen(v => !v)} aria-expanded={mobileOpen}>
        {mobileOpen ? <CloseIcon className="fc-menu__icon" /> : <MenuIcon className="fc-menu__icon" />}
        </button>
        {/* ДЕСКТОП МЕНЮ */}
        <ul className="fc-menu__list fc-menu__list--desktop" role="menubar">
          <li role="none" className="fc-menu__item">
            <Link
              role="menuitem"
              className="fc-menu__link"
              to="/main"
              onClick={handleNavClick}
            >
              Home
            </Link>
          </li>

          <li
            role="none"
            className={`fc-menu__item fc-menu__item--has-sub ${
              deskOpen ? "is-open" : ""
            }`}
            onMouseEnter={() => setDeskOpen(true)}
            onMouseLeave={() => setDeskOpen(false)}
          >
            <button
              type="button"
              className="fc-menu__link fc-menu__link--button"
              aria-haspopup="true"
              aria-expanded={deskOpen}
            >
              Federācija
            </button>

            {/* Мега-подменю (десктоп) */}
            <div
              className="fc-submenu"
              role="menu"
              // кликаем по ссылке внутри => всё сворачиваем
              onClick={handleNavClick}
            >
              <div className="fc-submenu__col">
                <span className="fc-submenu__title">Dokumenti</span>
                <ul className="fc-submenu__list">
                  <li>
                    <Link
                      to="/documents/noteikumi"
                      className="fc-submenu__link"
                    >
                      Noteikumi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/likUnDoc"
                      className="fc-submenu__link"
                    >
                      Likumi un dokumenti
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/dopings"
                      className="fc-submenu__link"
                    >
                      Dopings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/gadaParaksti"
                      className="fc-submenu__link"
                    >
                      Gada pārskati
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/kopsapulcesProtokoli"
                      className="fc-submenu__link"
                    >
                      Kopsapulces protokoli
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/valdesSedesProtokoli"
                      className="fc-submenu__link"
                    >
                      Valdes sēdes protokoli
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/budzets"
                      className="fc-submenu__link"
                    >
                      Budžets
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/sacensibuRezultati"
                      className="fc-submenu__link"
                    >
                      Notikušās sacensības
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/sacensibas"
                      className="fc-submenu__link"
                    >
                      Sacensības
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/sportistuRegistrs"
                      className="fc-submenu__link"
                    >
                      Sportistu reģistrs
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="fc-submenu__col">
                <span className="fc-submenu__title">Par federāciju</span>
                <ul className="fc-submenu__list">
                  <li>
                    <Link to="/Biedri" className="fc-submenu__link">
                      Biedri
                    </Link>
                  </li>
                  <li>
                    <Link to="/Valde" className="fc-submenu__link">
                      Valde
                    </Link>
                  </li>
                  <li>
                    <a href="/lkfIzlase.html" className="fc-submenu__link">
                      LKF izlase
                    </a>
                  </li>
                  <li>
                    <Link to="/Tiesniesi" className="fc-submenu__link">
                      Tiesniesi
                    </Link>
                  </li>

                  <li className="fc-submenu__group">
                    <span className="fc-submenu__title">Komisijas</span>
                    <ul className="fc-submenu__list">
                      <li>
                        <a href="#" className="fc-submenu__link">
                          Tiesnešu komisija
                        </a>
                      </li>
                      <li>
                        <a href="#" className="fc-submenu__link">
                          Ētikas komisija
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li role="none" className="fc-menu__item">
            <Link
              role="menuitem"
              className="fc-menu__link"
              to="/Kalendars"
              onClick={handleNavClick}
            >
              Kalendārs
            </Link>
          </li>

          <li role="none" className="fc-menu__item">
            <Link
              role="menuitem"
              className="fc-menu__link"
              to="/Eksamenacija"
              onClick={handleNavClick}
            >
              Eksaminācija
            </Link>
          </li>

          <li role="none" className="fc-menu__item">
            <a
              role="menuitem"
              className="fc-menu__link"
              href="#contact"
              onClick={handleContact}
            >
              Kontakti
            </a>
          </li>

          <button
            onClick={handleAccountClick}
            className="privacy-policy-link"
            aria-label={isAuthenticated ? "Atvērt profilu" : "Pieslēgties"}
          >
            <img
              src={isAuthenticated ? AccIn : Acc}
              alt={isAuthenticated ? "Aktīvs profils" : "Nav pieslēgts profils"}
              className="fc-menu__account-icon"
            />
          </button>
        </ul>
      </div>

      {/* МОБИЛЬНАЯ ПАНЕЛЬ */}
      <div
        id="fc-menu-panel"
        className="fc-panel"
        aria-hidden={!mobileOpen}
      >
        <ul className="fc-menu__list fc-menu__list--mobile">
          <li className="fc-menu__item">
            <Link
              className="fc-menu__link"
              to="/main"
              onClick={handleNavClick}
            >
              Home
            </Link>
          </li>

          <li
            className={`fc-menu__item ${
              open.federacija ? "is-open" : ""
            }`}
          >
            <button
              className="fc-menu__link fc-menu__link--button"
              onClick={() => toggle("federacija")}
              aria-expanded={open.federacija}
            >
              Federācija
            </button>

            <div
              className="fc-accordion"
              style={{ maxHeight: open.federacija ? 900 : 0 }}
            >
              <button
                className="fc-submenu__link fc-submenu__link--button"
                onClick={() => toggle("dokumenti")}
                aria-expanded={open.dokumenti}
              >
                Dokumenti
              </button>

              <div
                className="fc-accordion"
                style={{ maxHeight: open.dokumenti ? 700 : 0 }}
              >
                <ul className="fc-accordion__list">
                  <li>
                    <Link
                      to="/documents/noteikumi"
                      className="fc-submenu__link"
                      onClick={handleNavClick}
                    >
                      Noteikumi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/likUnDoc"
                      className="fc-submenu__link"
                      onClick={handleNavClick}
                    >
                      Likumi un dokumenti
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/dopings"
                      className="fc-submenu__link"
                      onClick={handleNavClick}
                    >
                      Dopings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/gadaParaksti"
                      className="fc-submenu__link"
                      onClick={handleNavClick}
                    >
                      Gada pārskati
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/kopsapulcesProtokoli"
                      className="fc-submenu__link"
                      onClick={handleNavClick}
                    >
                      Kopsapulces protokoli
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/valdesSedesProtokoli"
                      className="fc-submenu__link"
                      onClick={handleNavClick}
                    >
                      Valdes sēdes protokoli
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/budzets"
                      className="fc-submenu__link"
                      onClick={handleNavClick}
                    >
                      Budžets
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/sacensibuRezultati"
                      className="fc-submenu__link"
                      onClick={handleNavClick}
                    >
                      Notikušās sacensības
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/sacensibas"
                      className="fc-submenu__link"
                      onClick={handleNavClick}
                    >
                      Sacensības
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents/sportistuRegistrs"
                      className="fc-submenu__link"
                      onClick={handleNavClick}
                    >
                      Sportistu reģistrs
                    </Link>
                  </li>
                </ul>
              </div>

              <button
                className="fc-submenu__link fc-submenu__link--button"
                onClick={() => toggle("komisijas")}
                aria-expanded={open.komisijas}
              >
                Komisijas
              </button>

              <div
                className="fc-accordion"
                style={{ maxHeight: open.komisijas ? 260 : 0 }}
              >
                <ul className="fc-accordion__list">
                  <li>
                    <a
                      href="#"
                      className="fc-submenu__link"
                      onClick={hardCloseMenu}
                    >
                      Tiesnešu komisija
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="fc-submenu__link"
                      onClick={hardCloseMenu}
                    >
                      Ētikas komisija
                    </a>
                  </li>
                </ul>
              </div>

              <ul className="fc-accordion__list">
                <li>
                  <Link
                    to="/Biedri"
                    className="fc-submenu__link"
                    onClick={handleNavClick}
                  >
                    Biedri
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Valde"
                    className="fc-submenu__link"
                    onClick={handleNavClick}
                  >
                    Valde
                  </Link>
                </li>
                <li>
                  <a
                    href="/lkfIzlase.html"
                    className="fc-submenu__link"
                    onClick={hardCloseMenu}
                  >
                    LKF izlase
                  </a>
                </li>
                <li>
                  <Link
                    to="/Tiesniesi"
                    className="fc-submenu__link"
                    onClick={handleNavClick}
                  >
                    Tiesniesi
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="fc-menu__item">
            <Link
              className="fc-menu__link"
              to="/Kalendars"
              onClick={handleNavClick}
            >
              Kalendārs
            </Link>
          </li>

          <li className="fc-menu__item">
            <Link
              className="fc-menu__link"
              to="/Eksamenacija"
              onClick={handleNavClick}
            >
              Eksaminācija
            </Link>
          </li>

          <li className="fc-menu__item">
            <a
              className="fc-menu__link"
              href="#contact"
              onClick={handleContact}
            >
              Kontakti
            </a>
          </li>

          <button
            onClick={handleAccountClick}
            className="privacy-policy-link"
            aria-label={isAuthenticated ? "Atvērt profilu" : "Pieslēgties"}
          >
            <img
              src={isAuthenticated ? AccIn : Acc}
              alt={isAuthenticated ? "Aktīvs profils" : "Nav pieslēgts profils"}
              className="fc-menu__account-icon"
            />
          </button>
        </ul>
      </div>

      {/* ОВЕРЛЕЙ ПОД МОБИЛУ */}
      {mobileOpen && (
        <button
          ref={overlayRef}
          className="fc-overlay"
          aria-label="Close menu"
          onClick={hardCloseMenu}
        />
      )}
    </nav>
  );
}
