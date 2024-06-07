import React from 'react';
import { useRef } from 'react';
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
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 0.5,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
      };
    return (
        <div className="carousel-container">
            <div className='seminar-heading'>
                <h3>Semenari</h3>
            </div>
            <div className='clubs-carousel'>
                <div className='seminar-list slider-container'>
                    <Slider {...settings}> 
                        <div><SeminarBlock img={ApzinatibaSporta} link={'funcatchers.lv'} title={"Fun Catchers"} /></div>
                        <div><SeminarBlock img={SitSporta} link={'funcatchers.lv'} title={"Balistic Boxing Clubs"} /></div>
                        <div><SeminarBlock img={TraumaSporta} link={'funcatchers.lv'} title={"Boksa un Kikboksa skola"} /></div>
                        <div><SeminarBlock img={VFSBērniem} link={'funcatchers.lv'} title={"Muay Thai Academy"} /></div>
                    </Slider >
                </div>
            </div>
        </div>
    );
}
