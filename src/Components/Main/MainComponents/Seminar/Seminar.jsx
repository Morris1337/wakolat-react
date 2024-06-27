import React from 'react';
import { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SeminarBlock from './SeminarComponents/SeminarBlock';
import ApzinatibaSporta from "./img/ApzinatibaSporta.jpg"
import SitSporta from "./img/SitSporta.png"
import TraumaSporta from "./img/TraumaSporta.jpeg"
import VFSBērniem from "./img/VFSBērniem.jpg"
import './Seminar.scss'

// import OwlCarousel from 'next-owl-carousel';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function Seminar() {
    const [settings, setSettings] = useState ({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 0.5,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
      });

      const updateSettings = () =>{
        const screenWidth = window.innerWidth;
        let slidesToShow = 4;
    
        if(screenWidth <= 1400){
            slidesToShow = 4
        }
        if(screenWidth <= 800){
            slidesToShow = 2
        }
        if(screenWidth <= 375){
            slidesToShow = 1
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
        <div style={{marginTop:'-80px'}} className="carousel-container">
            <div className='seminar-heading'>
                <h3>Semenari</h3>
            </div>
            <div className='clubs-carousel'>
                <div className='seminar-list slider-container'>
                    <Slider {...settings}> 
                        <div className='block'><SeminarBlock img={ApzinatibaSporta} link={'funcatchers.lv'} title={"Fun Catchers"} /></div>
                        <div className='block'><SeminarBlock img={SitSporta} link={'funcatchers.lv'} title={"Balistic Boxing Clubs"} /></div>
                        <div className='block'><SeminarBlock img={VFSBērniem} link={'funcatchers.lv'} title={"Muay Thai Academy"} /></div>
                        <div className='block'><SeminarBlock img={TraumaSporta} link={'funcatchers.lv'} title={"Boksa un Kikboksa skola"} /></div>
                    </Slider >
                </div>
            </div>
        </div>
    );
}
