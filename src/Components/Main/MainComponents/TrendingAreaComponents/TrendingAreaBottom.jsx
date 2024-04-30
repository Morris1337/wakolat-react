import React, { Component } from 'react'
import './TrendingAreaComponents.css'
import bottomImg from "../../../../img/post/venstpils23.jpg"

export default class TrendingAreaBottom extends Component {
  render() {
    return (
        // Trending Bottom
        <>
            <div className="trend-block-bottom">
                <div class="single-bottom mb-35">
                    <div class="trend-bottom-img mb-30">
                        <img 
                        src={bottomImg} 
                        alt="img"
                        className='bottom-img'
                        />
                    </div>
                    <div class="trend-bottom-cap">
                        <span class="color1">Latvijas</span>
                        <h4><a className='bottom-post-name-text' href="#">Venspils KIKBOKSA čempionats</a></h4>
                    </div>
                </div>
            </div>
        </>
    )
  }
}
