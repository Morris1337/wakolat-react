import React from 'react';
import { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Clubs from './ClubsListComponents/Clubs';
// import FC from './img/LogoFcKick-2.jpg';
// import BBC from './img/Ballistic_Boxing_Club.jpg';
// import KBS from './img/Boksa_Kikboksa_skola.jpg';
import MTA from './img/Muay_Thai_Academy.jpg';
// import TopRing from './img/TOP_RING LOGO_GOLD PRINT.jpg';
// import SKITS from './img/LOGO-SKITS-oreginal.jpg';
import fcImg from '../../../../Pages/Federacija/Biedri/img/LogoFcKick-2.jpg'
import bbc from '../../../../Pages/Federacija/Biedri/img/BBC.png'
import kbs from '../../../../Pages/Federacija/Biedri/img/KBS-Riga-01.png'
import Kuldiga from '../../../../Pages/Federacija/Biedri/img/Cīņu_klubs_Kuldīga.jpeg'
import Favorit from '../../../../Pages/Federacija/Biedri/img/favorits.jpg'
import skits from '../../../../Pages/Federacija/Biedri/img/LOGO-SKITS-oreginal2.jpg'
import ltcs from '../../../../Pages/Federacija/Biedri/img/Logo_LTCS_s.jpg'
import topRing from '../../../../Pages/Federacija/Biedri/img/TOP_RING LOGO_GOLD PRINT2.jpg'
import mtl from '../../../../Pages/Federacija/Biedri/img/Muay_Thai_Liga.jpg'
import Silver_griffin from '../../../../Pages/Federacija/Biedri/img/Silver_Griffin.jpg'
import LiepajaKik from '../../../../Pages/Federacija/Biedri/img/LIepaja_Kik_team.jpg'
import Tkachenko from '../../../../Pages/Federacija/Biedri/img/TkachenkoTeam.png'
import Galeev from '../../../../Pages/Federacija/Biedri/img/GaleevTeam.jpg'
import GoldenGlory from '../../../../Pages/Federacija/Biedri/img/GoldenGlory.jpg'
// import MTA from '../../../../Pages/Federacija/Biedri/img/MTA.jpg'
import './ClubsList.scss';


export default function FederationClubs() {
  const [settings, setSettings] = useState ({
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  });

  const updateSettings = () =>{
    const screenWidth = window.innerWidth;
    let slidesToShow = 4;

    if(screenWidth <= 1400){
        slidesToShow = 4
    }
    if(screenWidth <= 800){
        slidesToShow = 3
    }
    if(screenWidth <= 400){
        slidesToShow = 2
    }

    setSettings(prevSettings => ({
        ...prevSettings,
        slidesToShow: slidesToShow,
    }));
  };

  useEffect(() =>{
    updateSettings();
    window.addEventListener('resize', updateSettings);
    return()=>{
        window.removeEventListener('resize', updateSettings);
    }
  },[]);
    return (
        <div className="carousel-container">
            <div className='clubs-heading'>
                <h3>Federācijas klubi</h3>
            </div>
            <div className='clubs-carousel'>
                <div className='clubs-list slider-container'>
                <Slider {...settings}>                  
                    <div><Clubs img={fcImg} link={'funcatchers.lv'} title={"Fun Catchers"} /></div>
                    <div><Clubs img={bbc} link={'funcatchers.lv'} title={"Balistic Boxing Clubs"} /></div>
                    <div><Clubs img={kbs} link={'funcatchers.lv'} title={"Boksa un Kikboksa skola"} /></div>
                    <div><Clubs img={MTA} link={'funcatchers.lv'} title={"Bērnu un jauniešu centrs 'Bolderāja'"} /></div>
                    <div><Clubs img={topRing} link={'funcatchers.lv'} title={"Top Ring"} /></div>
                    <div><Clubs img={skits} link={'funcatchers.lv'} title={"Skits"} /></div>
                    <div><Clubs img={Kuldiga} link={'funcatchers.lv'} title={"Cīņu klubs Kuldīga"} /></div>
                    <div><Clubs img={Favorit} link={'funcatchers.lv'} title={"Sporta klubs „Favorīts”"} /></div>
                    <div><Clubs img={ltcs} link={'funcatchers.lv'} title={"Sporta klubs 'LTCS'"} /></div>
                    <div><Clubs img={mtl} link={'funcatchers.lv'} title={"Latvijas Muay Thai Līga"} /></div>
                    <div><Clubs img={Silver_griffin} link={'funcatchers.lv'} title={"Silver Griffin"} /></div>
                    <div><Clubs img={LiepajaKik} link={'funcatchers.lv'} title={"Liepājas Kikboksinga Klubs “K Sports”"} /></div>
                    <div><Clubs img={Tkachenko} link={'funcatchers.lv'} title={"Muay Thai Academy"} /></div>
                    <div><Clubs img={Galeev} link={'funcatchers.lv'} title={"MUAY THAI SPORTA SKOLA RĪGA"} /></div>
                    <div><Clubs img={GoldenGlory} link={'funcatchers.lv'} title={"Golden Glory"} /></div>
                </Slider >
                </div>
            </div>
        </div>
    );
}
