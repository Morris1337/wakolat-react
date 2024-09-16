import React, { useEffect, useState } from 'react';
import TrendingAreaTop from './TrendingAreaComponents/TrendingAreaTop.jsx';
import TrendingAreaBottom from './TrendingAreaComponents/TrendingAreaBottom.jsx';
import TrendingAreaRight from './TrendingAreaComponents/TrendingAreaRight.jsx';
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
        const url = "https://test-api.zapto.org:8001/api/get_news"
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
                        <div class="col-lg-8">
                            <TrendingAreaTop></TrendingAreaTop>
                            <div class="trend-block-bottom">
                            {news.slice(1,4).map((obj) =>  
                                <div class="row trend-block-bottom">
                                    <div onClick={() => window.location.href = '/PublicateCompetition'}>                               
                                        <div className="trend-block-bottom">
                                            <div  key={obj["id"]} className="single-bottom mb-35">
                                                <div className="trend-bottom-img mb-30">
                                                    <img 
                                                    src={"https://test-api.zapto.org:8001/upload/" + obj["images"]} 
                                                    alt="img"
                                                    className='bottom-img'
                                                    />
                                                </div>
                                                <div className="trend-bottom-cap">
                                                    {/* <span className="color1">{discription}</span>            */}
                                                    <h4><a className='bottom-post-name-text' href="#">{obj["header"]}</a></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>
                            
                        </div>
                        <div class="col-lg-1 trend-right-blocks">
                            <div>
                                <TrendingAreaRight
                                img={ApzinatibaSporta}
                                title={"APZINĀTĪBA SPORTĀ UN SABALANSĒTA UZTURA NOZĪME SPORTĀ"}
                                discription={'seminars'}
                            />
                            </div>
                            <div>
                                <TrendingAreaRight
                                img={SitSporta}
                                title={"NOTIKS SEMINĀRS SPORTA SPECIĀLISTIEM"}
                                discription={'seminars'}
                                />
                            </div>
                            <div>
                                <TrendingAreaRight
                                img={bottomImg2}
                                title={"Iela vingrošana seminarts"}
                                discription={'Competition'}
                                />
                            </div>
                            <div>
                                <TrendingAreaRight
                                img={SitSporta}
                                title={"NOTIKS SEMINĀRS SPORTA SPECIĀLISTIEM"}
                                discription={'seminars'}
                                />
                            </div>
                            <div>
                                <TrendingAreaRight
                                img={ApzinatibaSporta}
                                title={"APZINĀTĪBA SPORTĀ UN SABALANSĒTA UZTURA NOZĪME SPORTĀ"}
                                discription={'seminars'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
  );
};

export default TrendingArea;