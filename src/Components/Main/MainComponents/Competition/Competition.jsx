import React from 'react'
import { useState } from 'react'
import CompetitonBlock from './CompetitonComponents/CompetitionBlock'
import "./Competition.scss"
import EUR_Champ from './img/EUR_Championship.jpg'
import Ghetto from './img/ghetto_fight_ventspils.jpg'
import LiepajaOpen from './img/Liepaja_Open2023.jpg'
import latvijaOpen from './img/LV_Open2023.jpeg'

export default function Competition() {
const comps = [
{img: EUR_Champ, link: 'funcatcher.lv', title:"Europe Championship", place:"EUR"},
{img: Ghetto, link: 'funcatcher.lv', title:"Ghetto Fight", place:"LV"},
{img: LiepajaOpen, link: 'funcatcher.lv', title:"Liepaja Open", place:"LV"},
{img: latvijaOpen, link: 'funcatcher.lv', title:"Latvija Open", place:"LV"}
]

  const [activeTab, setActiveTab] = useState("Visi");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredComp = comps.filter(comp =>{
    if(activeTab === "Visi") return true;
    return comp.place === activeTab;
  })
  
  return (

    <>
        <div className='competition'>
            <div className='competition-head'>
              <h3 className='competition-title'>
                Sacensibas
              </h3>
              <ul className='competition-menu'> 
                <li className={activeTab === "Visi" ? 'active':''} onClick={()=>handleTabClick("Visi")}>Visi</li>
                <li className={activeTab === "LV" ? 'active':''} onClick={()=>handleTabClick("LV")}>Latvijas</li>
                <li className={activeTab === "EUR" ? 'active':''} onClick={()=>handleTabClick("EUR")}>Eiropas</li>
                <li className={activeTab === "World" ? 'active':''} onClick={()=>handleTabClick("World")}>Pasaules</li>
              </ul>
            </div>
            <div className='competition-block'>
              {filteredComp.map((comp) =>(
                <CompetitonBlock 
                img={comp.img}
                link={comp.link}
                title={comp.title}
                place={comp.place}
              />
              ))}
            </div>
        </div>
    </>
  )
}
