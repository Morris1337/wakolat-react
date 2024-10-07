import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SeminarBlock from './SeminarComponents/SeminarBlock';
import PublicateSeminar from './SeminarPosts/PublicateSeminar';
import './Seminar.scss'

// import OwlCarousel from 'next-owl-carousel';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function Seminar() {
    const [seminars, setSeminars] = useState([]);
    
    useEffect(() => {
        async function get_seminars() {
            try {
                const url = "http://87.228.26.161:8020/api/get_seminars";
                const result = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // Ensure the content type is JSON
                    },
                });
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                const data = await result.json();
                console.log(data);
                setSeminars(data);
            } catch (error) {
                console.error("Failed to fetch seminars:", error);
            }
        }
        get_seminars();
    }, []);

    const [settings, setSettings] = useState({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 0.5,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
    });

    const updateSettings = () => {
        const screenWidth = window.innerWidth;
        let slidesToShow = 4;

        if (screenWidth <= 1400) {
            slidesToShow = 4;
        }
        if (screenWidth <= 800) {
            slidesToShow = 2;
        }
        if (screenWidth <= 375) {
            slidesToShow = 1;
        }

        setSettings(prevSettings => ({
            ...prevSettings,
            slidesToShow: slidesToShow,
        }));
    };

    useEffect(() => {
        updateSettings();
        window.addEventListener('resize', updateSettings);
        return () => {
            window.removeEventListener('resize', updateSettings);
        };
    }, []);

    return (
        <div style={{ marginTop: '-80px' }} className="carousel-container">
            <div className="seminar-heading">
                <h3>Semināri</h3>
            </div>
            <div className="clubs-carousel">
                <div className="seminar-list slider-container">
                    <Slider {...settings}>
                        {seminars.map((obj) => (
                            <div key={obj["id"]} className="weekly-single club-elem">
                                <div className="weekly-img">
                                    <img
                                        className="img-clubs"
                                        src={"http://87.228.26.161:8020/upload/" + obj["image"]}
                                        alt="img"
                                    />
                                </div>
                                <div className="weekly-caption">
                                    <Link to={`/PublicateSeminar/${obj.id}`}>{obj.header}</Link>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
