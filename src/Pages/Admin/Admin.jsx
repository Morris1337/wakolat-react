import React, { useState } from 'react'

import PostComponent from '../../Components/Main/MainComponents/Admin/PostComponent/PostComponent'
import CompetitionPostComponent from '../../Components/Main/MainComponents/Admin/CompetitionPostComponents/CompetitionPostComponents'
import SeminarPost from '../../Components/Main/MainComponents/Admin/SeminarPost/SeminarPost'
import CalendarPost from '../../Components/Main/MainComponents/Admin/CalendarPost/CalendarPost'

export default function Admin() {

  const [currentComponents, setCurrnetComponent] = useState('post')

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
          <div className="admin-menu admin-menu-phone">
            <div className="admin-menu-section">
              <div>
                <ul>
                  <li><button id="newsPost" onClick={()=> setCurrnetComponent('post')}>Jauna publikācija</button></li>
                  <li><button id="competitionPost" onClick={()=> setCurrnetComponent('competitionPost')}>Jaunas sacensības</button></li>
                  <li><button id="seminarPost" onClick={()=> setCurrnetComponent('seminarPost')}>Jauns seminārs</button></li>
                  <li><button id="calendar" onClick={()=> setCurrnetComponent('calendar')}>Kalendārs</button></li>
                </ul>
              </div>
            </div>
            <div className="admin-menu-icon-phone-block">
              <div className="triangle">  
              </div>
            </div>
          </div>
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