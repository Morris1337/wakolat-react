import React from 'react';
import { TrendingAreaTop } from './TrendingAreaComponents/TrendingAreaTop.jsx';
import TrendingAreaBottom from './TrendingAreaComponents/TrendingAreaBottom.jsx';
import TrendingAreaRight from './TrendingAreaComponents/TrendingAreaRight.jsx';

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
                                    <TrendingAreaBottom></TrendingAreaBottom>
                                    <TrendingAreaBottom></TrendingAreaBottom>
                                    <TrendingAreaBottom></TrendingAreaBottom>
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