import { useState, useEffect } from 'react';
import React from 'react'
import YouTubeComponents from './YouTubeComponents/YouTubeComponents';
import './Youtube.scss'
import arrow from './img/icon/arrow.png'

export default function YouTube() { 
    const videoList = [
      'https://www.youtube.com/embed/38mOhjMOUFc?si=cwQUwOboIskc7hlZ&controls=0',
      'https://www.youtube.com/embed/ztsKQAMLoRo?si=8305LqKC1yHjWJ7y&controls=0',
      'https://www.youtube.com/embed/38mOhjMOUFc?si=cwQUwOboIskc7hlZ&controls=0',
      'https://www.youtube.com/embed/ztsKQAMLoRo?si=8305LqKC1yHjWJ7y&controls=0'
    ];
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [visibleVideos, setVisibleVideos] = useState([]);

    const handleNextVideo = () => {
        setCurrentVideoIndex((currentVideoIndex + 1) % videoList.length);
      };
    
      const handlePreviousVideo = () => {
        setCurrentVideoIndex((currentVideoIndex - 1 + videoList.length) % videoList.length);
      };

      const updateVisibleVideos = () => {
        const screenWidth = window.innerWidth;
        let numVisible = 4;
    
        if (screenWidth <= 1200) numVisible = 3;
        if (screenWidth <= 800) numVisible = 2;
        if (screenWidth <= 400) numVisible = 0;
    
        setVisibleVideos(videoList.slice(0, numVisible));
      };
    
      useEffect(() => {
        updateVisibleVideos();
        window.addEventListener('resize', updateVisibleVideos);
    
        return () => {
          window.removeEventListener('resize', updateVisibleVideos);
        };
      }, []);

  return (
    <div className='you-tube-conteiner'>
        <div className='you-tube-center-content'>
            <div>
                <iframe                  
                    src= {videoList[currentVideoIndex]}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube Video Player"
                ></iframe>
                <div className='top-caption'>
                    <div className='buttons'>
                        <button onClick={handlePreviousVideo}>
                            <img src={arrow} alt="arrow" />
                        </button>
                        <button onClick={handleNextVideo}>
                            <img className='arrow-180' src={arrow} alt="arrow" />
                        </button>
                    </div>
                    <div className='top-caption-span'>
                        {/* <span class="color1">Multimediju bibliotēka</span> */}
                    </div>
                </div>
            </div>
        </div>
        <div className='you-tube-bottom-content'>
            <div className='bottom-caption'>
                <h2>Multimediju bibliotēka</h2>
                <p>Iepazīstiet video pasauli ar mūsu daudzveidīgo klipu kolekciju.</p>
            </div>
            <div className='you-tube-botton-video'>
                {visibleVideos.map((link, index) => (
                    <YouTubeComponents
                    key={index}
                    link={link}
                    isActive={currentVideoIndex === index}
                    onClick={() => setCurrentVideoIndex(index)}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}
