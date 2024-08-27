import React from 'react'
import './TrendingAreaComponents.css'
import { Link } from 'react-router-dom'
import PublicateCompetition from '../../Competition/PublicateCompetition/PublicateCompetition'

export default function TrendingAreaBottom({img, title, discription}){
    return (
        // Trending Bottom
        <> 
            <div className="trend-block-bottom">
                <div className="single-bottom mb-35">
                    <div className="trend-bottom-img mb-30">
                        <img 
                        src={img} 
                        alt="img"
                        className='bottom-img'
                        />
                    </div>
                    <div className="trend-bottom-cap">
                        <span className="color1">{discription}</span>           
                        <h4><a className='bottom-post-name-text' href="#">{title}</a></h4>
                    </div>
                </div>
            </div>
        </>
    )
}
