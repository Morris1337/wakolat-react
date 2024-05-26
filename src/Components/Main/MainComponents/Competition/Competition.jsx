import React from 'react'
import CompetitonBlock from './CompetitonComponents/CompetitionBlock'
import "./Competition.scss"
import EUR_Champ from './img/EUR_Championship.jpg'
import Ghetto from './img/ghetto_fight_ventspils.jpg'
import LiepajaOpen from './img/Liepaja_Open2023.jpg'
import latvijaOpen from './img/LV_Open2023.jpeg'

export default function Competition() {
  return (
    <>
        <div className='competition'>
            <div className='competition-head'>
              <h3 className='competition-title'>
                Sacensibas
              </h3>
              <ul className='competition-menu'> 
                <li>Visi</li>
                <li>Latvijas</li>
                <li>Eiropas</li>
                <li>Pasaules</li>
              </ul>
            </div>
            <div className='competition-block'>
              <CompetitonBlock img={EUR_Champ} link={'funcatcher.lv'} title={"Europe Championship"}/>
              <CompetitonBlock img={Ghetto} link={'funcatcher.lv'} title={"Ghetto Fight"}/>
              <CompetitonBlock img={LiepajaOpen} link={'funcatcher.lv'} title={"Liepaja Open"}/>
              <CompetitonBlock img={latvijaOpen} link={'funcatcher.lv'} title={"Latvija Open"}/>
            </div>
        </div>
    </>
  )
}
