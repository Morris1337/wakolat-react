import React from 'react'
import './biedri.scss'

export default function BiedriCardWithOutLogo({clubTitle, city}) {
  return (
    <div className="back background-white">
        <div className="about-club">
            <h4 className="name">{clubTitle}</h4>
            <p>{city}</p>
        </div>
    </div>
  )
}
