import React from 'react';
import { useRef } from 'react';
// import OwlCarousel from 'next-owl-carousel';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import Clubs from './ClubsListComponents/Clubs';
import FC from './img/LogoFcKick-2.jpg';
import BBC from './img/Ballistic_Boxing_Club.jpg';
import KBS from './img/Boksa_Kikboksa_skola.jpg';
import MTA from './img/Muay_Thai_Academy.jpg';
import TopRing from './img/TOP_RING LOGO_GOLD PRINT.jpg';
import SKITS from './img/LOGO-SKITS-oreginal.jpg';
import './ClubsList.scss';

export default function FederationClubs() {
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
            <div className='clubs-heading'>
                <h3>Federācijas klubi</h3>
            </div>
            <div className='clubs-carousel'>
                <div className='clubs-list'>
                {/* <OwlCarousel ref={carouselRef} options={options} events={events} className="owl-carousel"> */}
                    <div><Clubs img={FC} link={'funcatchers.lv'} title={"Fun Catchers"} /></div>
                    <div><Clubs img={BBC} link={'funcatchers.lv'} title={"Balistic Boxing Clubs"} /></div>
                    <div><Clubs img={KBS} link={'funcatchers.lv'} title={"Boksa un Kikboksa skola"} /></div>
                    <div><Clubs img={MTA} link={'funcatchers.lv'} title={"Muay Thai Academy"} /></div>
                    <div><Clubs img={TopRing} link={'funcatchers.lv'} title={"Top Ring"} /></div>
                    <div><Clubs img={SKITS} link={'funcatchers.lv'} title={"Skits"} /></div>
                {/* </OwlCarousel> */}
                </div>
            </div>
        </div>
    );
}
