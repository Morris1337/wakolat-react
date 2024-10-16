import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import TrendingAreaTop from './TrendingAreaComponents/TrendingAreaTop.jsx';
import TrendingAreaBottom from './TrendingAreaComponents/TrendingAreaBottom.jsx';
import TrendingAreaRight from './TrendingAreaComponents/TrendingAreaRight.jsx';
import "./TrendingArea.scss";
import './TrendingAreaComponents/TrendingAreaComponents.css'
import './TrendingAreaComponents/TrendingAreaComponents.css'
import FederationClubs from '../ClubList/ClubsList.jsx';
import bottomImg1  from "./img/venstpils23.jpg"
import bottomImg2 from "./img/SeminarLIVF.jpeg"

import ApzinatibaSporta from "../Seminar/img/ApzinatibaSporta.jpg"
import SitSporta from "../Seminar/img/SitSporta.png"
import TraumaSporta from "../Seminar/img/TraumaSporta.jpeg"
import VFSBērniem from "../Seminar/img/VFSBērniem.jpg"

const TrendingArea = () => {
    const [news, setNews] = useState([])
    useEffect(()=>{async function get_news() {
        const url = "http://164.92.147.233:8020/api/get_news"
        const result = await fetch(url)
        const data = await result.json()
        console.log(data)
        setNews(data)
    }
get_news()}
,[])

  return (
        <>
        {/* Trending Area Start */}
        <div class="trending-area fix">
            <div class="container">
                <div class="trending-main">
                    {/* Trending Tittle  */}
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="trending-tittle">
                            
                            </div>                
                        </div>
                    </div>
                    <div class="row trend-center">
                        <div class="trend-center-size">
                            {news.slice(0,1).map((obj) =>  
                                <div key={obj["id"]} class="trending-top mb-30">
                                    <div class="trend-top-img">
                                        <img 
                                        src={"http://164.92.147.233:8020/upload/" + obj["image"]} 
                                        alt=""
                                        className='top-img'
                                        />
                                        <div class="trend-top-cap">
                                            <span>News</span>
                                            <Link to={`/PublicatePosts/${obj.id}`}>
                                            <h2>{obj["header"]}</h2>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div class="trend-block-bottom">
                            {news.slice(1,4).map((obj) =>  
                                <div class="row">
                                    <div /*onClick={() => window.location.href = '/PublicateCompetition'}*/>                               
                                        <div>
                                            <div  key={obj["id"]} className="single-bottom mb-35">
                                                <div className="trend-bottom-img mb-30">
                                                    <img 
                                                    src={"http://164.92.147.233:8020/upload/" + obj["image"]} 
                                                    alt="img"
                                                    className='bottom-img'
                                                    />
                                                </div>
                                                <div className="trend-bottom-cap">
                                                    <h4>
                                                    <Link to={`/PublicatePosts/${obj.id}`}>{obj.header}</Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
    
                        </div>
                        <div class="col-lg-1 trend-right-blocks">
                        {news.slice(4,10).map((obj) => 
                            <div>
                                <div class="trand-right-single d-flex">
                                    <div class="trand-right-img">
                                        <img src={"http://164.92.147.233:8020/upload/" + obj["image"]} alt="img"/>
                                    </div>
                                    <div class="trand-right-cap">
                                        {/* <span class="color1">{discription}</span> */}
                                        <Link to={`/PublicatePosts/${obj.id}`}>{obj.header}</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
  );
};

export default TrendingArea;