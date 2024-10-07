import React from 'react'
import BiedriCard from './BiedriCard.jsx'
import BiedriCardWithOutLogo from './BiedriCardWithOutLogo.jsx'
import fcImg from './img/LogoFcKick-2.jpg'
import bbc from './img/Ballistic_Boxing_Club.jpg'
import kbs from './img/KBS-Riga-01.png'
import Kuldiga from './img/Cīņu_klubs_Kuldīga.jpeg'
import Favorit from './img/favorits.jpg'
import skits from './img/LOGO-SKITS-oreginal2.jpg'
import ltcs from './img/Logo_LTCS_s.jpg'
import topRing from './img/TOP_RING LOGO_GOLD PRINT.jpg'
import mtl from './img/Muay_Thai_Liga.jpg'
import './biedri.scss'
import MapWithClubs from '../../../Components/Main/OrhetComponents/MapWithClubs.jsx'

export default function Biedri() {
  return (
    <>
      <h2 class="display-center">
        Latvijas Kikboksa Federācija Biedri
      </h2>
      <div className='biedri-cards'>
          <div><BiedriCard img={Favorit} clubTitle={'Sporta klubs „Favorīts”'} city={'Ventspils'}/></div>
          <div><BiedriCard img={skits} clubTitle={'Cīņu mākslas sporta klubs "Skits"'} city={'Līvāni'}/></div>
          <div><BiedriCard img={kbs} clubTitle={'Kikboksa un boksa skola "Rīga"'} city={'Rīga'}/></div>
          <div><BiedriCard img={bbc} clubTitle={'Ballistic Boxing Club'} city={'Liepāja'}/></div>
          <div><BiedriCard img={Kuldiga} clubTitle={'Cīņu klubs Kuldīga'} city={'Kuldīga'}/></div>
          <div><BiedriCard img={ltcs} clubTitle={'Sporta klubs "LTCS"'} city={'Rīga'}/></div>
          <div><BiedriCard img={topRing} clubTitle={'Top Ring'} city={'Priekuļu nov'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'MUAY THAI SPORTA SKOLA RĪGA'} city={'Rīga'}/></div>
          <div><BiedriCard img={mtl} clubTitle={'Latvijas Muay Thai Līga'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Tkachenko Team'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Fun Catchers'} city={'Līči, Stopiņu pag., Ropažu nov.'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Cīņu Mākslas Centrs BUDO'} city={'Latvija'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Silver Griffin'} city={'Rēzekne'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Liepājas Kikboksinga Klubs “K Sports”'} city={'Liepāja'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Bērnu un jauniešu centrs "Bolderāja"'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'LSPA sporta klubs'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Ventspils Kikboksa Leģions'} city={'Ventspils'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'TM Gym'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Lāčplēša Cīņu Leģions'} city={'Ķekava'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Golden Glory'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Boksa un kikboksa klubs "Olympic Boxing Team"'} city={'Rīga'}/></div>
          <div><BiedriCardWithOutLogo clubTitle={'Cīņu Mākslas Centrs BUDO'} city={'Latvija'}/></div>
      </div>
      <div className='ClubMap'>
        <MapWithClubs/>
      </div>
    </>
  )
}
