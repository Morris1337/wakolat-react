import React from 'react';
import { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Clubs from './ClubsListComponents/Clubs';
import FC from './img/LogoFcKick-2.jpg';
import BBC from './img/Ballistic_Boxing_Club.jpg';
import KBS from './img/Boksa_Kikboksa_skola.jpg';
import MTA from './img/Muay_Thai_Academy.jpg';
import TopRing from './img/TOP_RING LOGO_GOLD PRINT.jpg';
import SKITS from './img/LOGO-SKITS-oreginal.jpg';
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
    if(screenWidth <= 375){
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
                    <div><Clubs img={FC} link={'funcatchers.lv'} title={"Fun Catchers"} /></div>
                    <div><Clubs img={BBC} link={'funcatchers.lv'} title={"Balistic Boxing Clubs"} /></div>
                    <div><Clubs img={KBS} link={'funcatchers.lv'} title={"Boksa un Kikboksa skola"} /></div>
                    <div><Clubs img={MTA} link={'funcatchers.lv'} title={"Muay Thai Academy"} /></div>
                    <div><Clubs img={TopRing} link={'funcatchers.lv'} title={"Top Ring"} /></div>
                    <div><Clubs img={SKITS} link={'funcatchers.lv'} title={"Skits"} /></div>
                </Slider >
                </div>
            </div>
        </div>
    );
}
