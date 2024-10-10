import React, { useState, useEffect } from 'react'

import PostComponent from '../../Components/Main/MainComponents/Admin/PostComponent/PostComponent'
import CompetitionPostComponent from '../../Components/Main/MainComponents/Admin/CompetitionPostComponents/CompetitionPostComponents'
import SeminarPost from '../../Components/Main/MainComponents/Admin/SeminarPost/SeminarPost'
import CalendarPost from '../../Components/Main/MainComponents/Admin/CalendarPost/CalendarPost'

export default function Admin() {

  const [currentComponents, setCurrnetComponent] = useState('post')

  const [isMenuVisible, setIsMenuVisible] = useState(true); // Для управления видимостью меню
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 800); // Определение режима мобильного просмотра

  const updateSettings = () => {
    const screenWidth = window.innerWidth;
    setIsMobileView(screenWidth <= 800); // Если экран меньше 800px, переключаем на мобильный режим
  };

  useEffect(() => {
    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => {
      window.removeEventListener('resize', updateSettings);
    };
  }, []);

    const toggleMenu = () => {
      setIsMenuVisible(!isMenuVisible); // Переключаем видимость меню
    };
    const renderComponents = () =>{
      switch (currentComponents){
        case 'post':
          return<PostComponent/>;
        case 'competitionPost':
          return<CompetitionPostComponent/>;
        case 'seminarPost':
          return<SeminarPost/>;
        case 'calendar':
          return<CalendarPost/>;
        default:
          <PostComponent/>
      }
    }

    return (
        <div className="conteiner-admin">
          <div className='titleAdmin'>
            <h2>Administratora panelis</h2>
          </div>
          {/* Кнопка для открытия меню в мобильном режиме */}
          {isMobileView && (
            <button 
              className={`menu-toggle-button ${isMenuVisible ? 'active' : ''}`} 
              onClick={toggleMenu}
            >                {isMenuVisible ? 'Aizvert menu' : 'Menu'}
              </button>
            )}
            {/* Меню, скрывающееся на маленьких экранах */}
            {(!isMobileView || isMenuVisible) && (
          <div className="admin-menu admin-menu-phone">
            <div className="admin-menu-section">
              <div>
                <ul>
                  <li><button 
                  className={`admin-menu-section ${isMenuVisible ? 'active' : ''}`} 
                  id="newsPost" onClick={()=> setCurrnetComponent('post')}>Jauna publikācija</button></li>
                  <li><button 
                  className={`admin-menu-section ${isMenuVisible ? 'active' : ''}`} 
                  id="competitionPost" onClick={()=> setCurrnetComponent('competitionPost')}>Jaunas sacensības</button></li>
                  <li><button 
                  className={`admin-menu-section ${isMenuVisible ? 'active' : ''}`} 
                  id="seminarPost" onClick={()=> setCurrnetComponent('seminarPost')}>Jauns seminārs</button></li>
                  {/* <li><button id="calendar" onClick={()=> setCurrnetComponent('calendar')}>Kalendārs</button></li> */}
                </ul>
              </div>
            </div>
            <div className="admin-menu-icon-phone-block">
              <div className="triangle">  
              </div>
            </div>
          </div>
            )}
          <div>
            <div id="conteiner-form">
              <div id="form">
                {renderComponents()}
              </div>
            </div>
          </div>
        </div>
      );
}