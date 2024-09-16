import React, { useEffect, useState } from 'react'
import './TrendingAreaComponents.css'
import {Link} from 'react-router-dom';
import postImg from "../../../../../img/post/eiropasIzlase.jpg"

export default function TrendingAreaTop() {

  const [news, setNews] = useState([])
  useEffect(()=>{async function get_news() {
      const url = "https://test-api.zapto.org:8001/api/get_news"
      const result = await fetch(url)
      const data = await result.json()
      console.log(data)
      setNews(data)
  }
get_news()}
,[])

    return (
      <>
        {news
        .slice(0,1)
        .map((obj) =>  
          <div key={obj["id"]} class="trending-top mb-30">
              <div class="trend-top-img">
                  <img 
                  src={"https://test-api.zapto.org:8001/upload/" + obj["images"]} 
                  alt=""
                  className='top-img'
                  />
                  <div class="trend-top-cap">
                      <span>News</span>
                      <Link
                      to={'/publicatePosts'}
                      >
                        <h2><a href="details.html">{obj["header"]}</a></h2>
                      </Link>
                  </div>
              </div>
          </div>
        )}
    </>
    )
}
