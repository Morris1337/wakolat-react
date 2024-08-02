import React from 'react'
import BiedriCard from './BiedriCard.jsx'
import fcImg from './img/LogoFcKick-2.jpg'
import './biedri.scss'

export default function Biedri() {
  return (
    <>
      <h2 class="display-center">
        Latvijas Kikboksa Federācija Biedri
      </h2>
      <div className='biedri-cards'>
          <div><BiedriCard img={fcImg} clubTitle={'Cīņu Mākslas Centrs BUDO'} city={'Latvija'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Sporta klubs „Favorīts”'} city={'Ventspils'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Cīņu mākslas sporta klubs "Skits"'} city={'Līvāni'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Sporta biedrība„Sedna”'} city={'Rēzekne'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Liepājas Kikboksinga Klubs “K Sports”'} city={'Liepāja'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Kikboksa un boksa skola "Rīga"'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Bērnu un jauniešu centrs "Bolderāja"'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Ballistic Boxing Club'} city={'Liepāja'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'LSPA sporta klubs'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Cīņu klubs Kuldīga'} city={'Kuldīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Ventspils Kikboksa Leģions'} city={'Ventspils'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'101 km'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Lāčplēša Cīņu Leģions'} city={'Ķekava'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Sporta klubs „Fair Fighting”'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Sporta klubs "LTCS"'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Jūrmalas boksa klubs'} city={'Jūrmala'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Jāna Roviča boksa klubs'} city={'Jūrmala'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Vidzemes Cīnītāju Līga'} city={'Madona'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'boksa autosporta un citu veidu sporta klubs'} city={'Daugava'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Jelgavas boksa klubs „JUNIORS”'} city={'Jelgava'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Golden Glory'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Boksa un kikboksa klubs "Olympic Boxing Team"'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Top Ring'} city={'Priekuļu nov'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'MUAY THAI SPORTA SKOLA RĪGA'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Cīņu sporta skola Rīga'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Latvijas Muay Thai Līga'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Scooter-tuning'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Tkachenko Team'} city={'Rīga'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Fun Catchers'} city={'Līči, Stopiņu pag., Ropažu nov.'}/></div>
          <div><BiedriCard img={fcImg} clubTitle={'Cīņu Mākslas Centrs BUDO'} city={'Latvija'}/></div>
      </div>
    </>
  )
}
