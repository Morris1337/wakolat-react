import React, { Component } from 'react'
import './TrendingAreaComponents.css'

export default function TrendingAreaRight({img, title, discription}) {
    return (
      <>
      {/* Right content */}
        <div class="trand-right-single d-flex">
            <div class="trand-right-img">
                <img src={img} alt=""/>
            </div>
            <div class="trand-right-cap">
                <span class="color1">{discription}</span>
                <h4>{title}</h4>
            </div>
        </div>
      </>
    )
}

// width="120px" height="120px"
