import React from 'react';
import { TrendingAreaTop } from './TrendingAreaComponents/TrendingAreaTop.jsx';
import TrendingAreaBottom from './TrendingAreaComponents/TrendingAreaBottom.jsx';
import TrendingAreaRight from './TrendingAreaComponents/TrendingAreaRight.jsx';
import FederationClubs from '../ClubList/ClubsList.jsx';
import bottomImg1  from "./img/venstpils23.jpg"
import bottomImg2 from "./img/SeminarLIVF.jpeg"

import ApzinatibaSporta from "../Seminar/img/ApzinatibaSporta.jpg"
import SitSporta from "../Seminar/img/SitSporta.png"
import TraumaSporta from "../Seminar/img/TraumaSporta.jpeg"
import VFSBērniem from "../Seminar/img/VFSBērniem.jpg"

const TrendingArea = () => {
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
                            <div class="trending-bottom">
                                <div class="row trend-block-bottom">
                                    <div onClick={() => window.location.href = '/PublicateCompetition'}>
                                        <TrendingAreaBottom
                                            img={bottomImg1}
                                            title={"Ventspils Kikboksa Čempionats"}
                                            discription={'Competition'}
                                        />
                                    </div>

                                    <TrendingAreaBottom
                                        img={bottomImg2}
                                        title={"Iela vingrošana seminarts"}
                                        discription={'Competition'}
                                    />
                                    <TrendingAreaBottom
                                        img={bottomImg1}
                                        title={"Ventspils Kikboksa Čempionats"}
                                        discription={'Competition'}
                                    />
                                </div>
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