import React, { Component } from 'react'
import './TrendingAreaComponents.css'

export default class TrendingAreaRight extends Component {
  render() {
    return (
      <>
      {/* Right content */}
        <div class="trand-right-single d-flex">
            <div class="trand-right-img">
                <img width="120px" height="120px" src="assets/img/post2/365210795_846688127144626_2398099006041129976_n.jpg" alt=""/>
            </div>
            <div class="trand-right-cap">
                <span class="color1">Sacensibas</span>
                <h4><a href="#">Eiropas čempionāts 2023</a></h4>
            </div>
        </div>
      </>
    )
  }
}
