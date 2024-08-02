import React from 'react'
import './biedri.scss'

export default function BiedriCard({img, clubTitle, city}) {
  return (
    <div className="flip-container">
        <div className="shield flipper">
            <div className="front">
                <img className='img-flag' src={img} alt="" />
            </div>
            <div className="back background-white">
                <div className="about-club">
                    <h4 className="name">{clubTitle}</h4>
                    <p>{city}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
