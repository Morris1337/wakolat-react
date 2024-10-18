import React from 'react'
import BiedriCard from './BiedriCard.jsx'
import BiedriCardWithOutLogo from './BiedriCardWithOutLogo.jsx'
import ScrollToTop from '../../../Components/Main/OrhetComponents/ScrollToTop.jsx'
import fcImg from './img/LogoFcKick-2.jpg'
import bbc from './img/BBC.png'
import kbs from './img/KBS-Riga-01.png'
import Kuldiga from './img/Cīņu_klubs_Kuldīga.jpeg'
import Favorit from './img/favorits.jpg'
import skits from './img/LOGO-SKITS-oreginal2.jpg'
import ltcs from './img/Logo_LTCS_s.jpg'
import topRing from './img/TOP_RING LOGO_GOLD PRINT2.jpg'
import mtl from './img/Muay_Thai_Liga.jpg'
import Silver_griffin from './img/Silver_Griffin.jpg'
import LiepajaKik from './img/LIepaja_Kik_team.jpg'
import Tkachenko from './img/TkachenkoTeam.png'
import Galeev from './img/GaleevTeam.jpg'
import GoldenGlory from './img/GoldenGlory.jpg'
import MTA from './img/MTA.jpg'
import './biedri.scss'
import MapWithClubs from '../../../Components/Main/OrhetComponents/MapWithClubs.jsx'

export default function Biedri() {
  return (
    <>
    <ScrollToTop />
      <h2 class="display-center">
        Latvijas Kikboksa Federācija Biedri
      </h2>
      <div className='biedri-cards'>
          <div><BiedriCard img={Favorit} clubTitle={'Sporta klubs „Favorīts”'} city={'Mālu iela 10, Ventspils, LV-3604'}/></div>
          <div><BiedriCard img={skits} clubTitle={'Cīņu mākslas sporta klubs "Skits"'} city={'Fabrikas iela 2, Līvāni, Līvānu pilsēta, Līvānu novads, LV-5316'}/></div>
          <div><BiedriCard img={kbs} clubTitle={'Kikboksa un boksa skola "Rīga"'} city={'Klusā iela 12 K-3, Vidzemes priekšpilsēta, Rīga, LV-1013'}/></div>
          <div><BiedriCard img={bbc} clubTitle={'Ballistic Boxing Club'} city={' Malkas iela 4, Liepāja, LV-3401'}/></div>
          <div><BiedriCard img={Kuldiga} clubTitle={'Cīņu klubs Kuldīga'} city={'Kuldīgas nov., Kuldīga, Vienības iela 87, LV-3301'}/></div>
          <div><BiedriCard img={ltcs} clubTitle={'Sporta klubs "LTCS"'} city={'Rīga, Vaidavas iela 3 - 2, LV-1084'}/></div>
          <div><BiedriCard img={topRing} clubTitle={'Top Ring'} city={'Lubānas iela 78b, Latgales priekšpilsēta, Rīga, LV-1073'}/></div>
          <div><BiedriCard img={Galeev} clubTitle={'MUAY THAI SPORTA SKOLA RĪGA'} city={'Burtnieku-37, Rīga.'}/></div>
          <div><BiedriCard img={mtl} clubTitle={'Latvijas Muay Thai Līga'} city={'Rīga'}/></div>
          <div><BiedriCard img={Tkachenko} clubTitle={'Tkachenko Team'} city={'Brīvības iela 148, LV-1012'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Fun Catchers'} city={'Līči, Stopiņu pag., Ropažu nov.'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Cīņu Mākslas Centrs BUDO'} city={'Latvija'}/></div>
          <div><BiedriCard img={Silver_griffin} clubTitle={'Silver Griffin'} city={'Rēzekne, Atbrīvošanas aleja 166A'}/></div>
          <div><BiedriCard img={LiepajaKik} clubTitle={'Liepājas Kikboksinga Klubs “K Sports”'} city={'Brīvības iela 117, Liepāja, LV-3401'}/></div>
          <div><BiedriCard img={MTA} clubTitle={'Bērnu un jauniešu centrs "Bolderāja"'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'LSPA sporta klubs'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Ventspils Kikboksa Leģions'} city={'Ventspils'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'TM Gym'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Lāčplēša Cīņu Leģions'} city={'Ķekava'}/></div>
          <div><BiedriCard img={GoldenGlory} clubTitle={'Golden Glory'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Boksa un kikboksa klubs "Olympic Boxing Team"'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Cīņu Mākslas Centrs BUDO'} city={'Latvija'}/></div>
      </div>
      <div className='ClubMap'>
        <MapWithClubs/>
      </div>
    </>
  )
}
