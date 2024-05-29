import React from 'react';
import { useRef } from 'react';
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
    const carouselRef = useRef(null);
    const options = {
        loop: true,
        responsiveClass: true,
        dots: false,
        autoplay: true,
        responsive: {
          0: { items: 1, dots: true },
          768: { items: 2 },
        },
      };
      const events = {
        onDragged: function (event) {
          console.log('====onDragged==>>', event);
        },
        onChanged: function (event) {
          console.log('====onChanged==>>', event);
        },
      };
    return (
        <div className="carousel-container">
            <div className='seminar-heading'>
                <h3>Semenari</h3>
            </div>
            <div className='clubs-carousel'>
                <div className='seminar-list'>
                {/* <OwlCarousel ref={carouselRef} options={options} events={events} className="owl-carousel"> */}
                    <div><SeminarBlock img={ApzinatibaSporta} link={'funcatchers.lv'} title={"Fun Catchers"} /></div>
                    <div><SeminarBlock img={SitSporta} link={'funcatchers.lv'} title={"Balistic Boxing Clubs"} /></div>
                    <div><SeminarBlock img={TraumaSporta} link={'funcatchers.lv'} title={"Boksa un Kikboksa skola"} /></div>
                    <div><SeminarBlock img={VFSBērniem} link={'funcatchers.lv'} title={"Muay Thai Academy"} /></div>
                {/* </OwlCarousel> */}
                </div>
            </div>
        </div>
    );
}
