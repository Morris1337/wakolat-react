import React, { Component } from 'react'
import './TrendingAreaComponents.css'
import {Link} from 'react-router-dom';
import postImg from "../../../../../img/post/eiropasIzlase.jpg"

export class TrendingAreaTop extends Component {
  render() {
    return (
        <>
        {/* Trending Top */}
        <div class="trending-top mb-30">
            <div class="trend-top-img">
                <img 
                src={postImg} 
                alt=""
                className='top-img'
                />
                <div class="trend-top-cap">
                    <span>News</span>
                    <Link
                    to={'/publicatePosts'}
                    >
                      <h2><a href="details.html">Latvijas kikbokseriem <br /> vairākas medaļas EČ jauniešiem</a></h2>
                    </Link>
                </div>
            </div>
        </div>
    </>
    )
  }
}
