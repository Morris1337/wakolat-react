import React from 'react'
import "./Footer.scss"
import LKF_Logo from './img/Federation/Color-logo_2x-100-removebg-preview.png'
import Izglitiba_ministrijas from './img/Federation/noklusejuma-logotips-augseja-kreisaja-puse.png'
import LSFP from './img/Federation/LSFP_logo-removebg-preview.png'
import WAKO from './img/Federation/Wako_page-0001-removebg-preview.png'
import adiddas from './img/GoldSponsors/Adidas_Logo.svg.png'
import Manus from './img/GoldSponsors/unnamed.png'
import Masters from './img/GoldSponsors/logo-big.png'
import RDX from './img/GoldSponsors/mw6epc2qqvfkzbmo7abw0zk6b6gdprg0.png'
import Century from './img/PlatimumSponsors/cmas-logo-horizontal.webp'
import TopTen from './img/PlatimumSponsors/9uem3o8rlz24rd8mjqedi2k4gtmaa1eu-removebg-preview.png'


export default function Footer() {
  return (
    <div className='footer'>
        <div className='platinum-sponsors'>
            <h3>
                Platinum sponsors
            </h3>
            <div className='platinum-sponsors-logo'>
                <img className='one' src={TopTen} alt="" />
                <img className='two' src={Century} alt="" />
            </div>
        </div>
        <div className='gold-sponsors'>
            <h3>
                Gold sponsors
            </h3>
            <div className='gold-sponsors-logo'>
                <img className='one' src={adiddas} alt="adiddas" />
                <img className='two' src={Manus} alt="Manus" />
                <img className='three' src={Masters} alt="Masters" />
                <img className='four' src={RDX} alt="RDX" />
            </div>
        </div>
        <div className='footer-info'>
            <div className='LKF-logo'>
                <img src={LKF_Logo} alt="" />
            </div>
            <div  className='footer-text'>
                <h6>Latvijas Kikboksa Federācija</h6>
                <p><b>Adrese:</b> Žagatu iela 20-80, Rīga, Latvija, LV-1084.</p>
                <p><b>Telefons:</b> +371 26226838</p>
                <p><b>E-pasts:</b> info@wakolat.lv</p>
            </div>
            <div className='WAKO-logo'>
                <img src={WAKO} alt="" />
            </div>
            <div className='ministtrijas-logo'>
                <img className='izglitiba-ministrija' src={Izglitiba_ministrijas} alt="" />
                <img src={LSFP} alt="" />
            </div>
        </div>
    </div>
  )
}