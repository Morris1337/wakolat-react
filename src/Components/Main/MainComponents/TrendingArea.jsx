import React, {useEffect, useState} from 'react';
import { TrendingAreaTop } from './TrendingAreaComponents/TrendingAreaTop.jsx';
import TrendingAreaBottom from './TrendingAreaComponents/TrendingAreaBottom.jsx';
import TrendingAreaRight from './TrendingAreaComponents/TrendingAreaRight.jsx';
import bottomImg from "../../../img/post/venstpils23.jpg"

const TrendingArea = () => {
    const [cards, setCards]=useState([])
    const serverData=[
        {
            img:bottomImg,
            title:"1",
            discription:"a"
        },
        {
            img:bottomImg,
            title:"2",
            discription:"a"
        },
        {
            img:bottomImg,
            title:"3",
            discription:"a"
        },
        
    ]
    useEffect(()=>{
        setTimeout(()=>{
            setCards(serverData)
        },500)
    },[])
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
                                    {cards.map((card)=>{
                                        return(<TrendingAreaBottom
                                            img={card.img}
                                            title={card.title}
                                            discription={card.discription}
                                            />)
                                    })}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-1 trend-right-blocks">
                            <TrendingAreaRight></TrendingAreaRight>
                            <TrendingAreaRight></TrendingAreaRight>
                            <TrendingAreaRight></TrendingAreaRight>
                            <TrendingAreaRight></TrendingAreaRight>
                            <TrendingAreaRight></TrendingAreaRight>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
  );
};

export default TrendingArea;