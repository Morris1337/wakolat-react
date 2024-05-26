import React from 'react'
import '../Competition.scss'

export default function CompetitonBlock({img, link, title}) {
  return (
    <div className="weekly-single club-elem">
        <div className="weekly-img">
            <img className='img-clubs' src={img} alt="img"/>
        </div>
        <div className="weekly-caption">
            <span className="color1">Federācijas klubi</span>
            <h4><a href={link}>{title}</a></h4>
        </div>
    </div> 
  )
}