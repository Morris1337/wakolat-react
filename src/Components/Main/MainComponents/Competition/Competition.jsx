import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CompetitonBlock from './CompetitonComponents/CompetitionBlock'
import "./Competition.scss"

export default function Competition() {

  const [competition, setCompetition] = useState([]);

  useEffect(()=>{async function get_competitions() {
    const url = "http://164.92.147.233:8020/api/get_competitions"
    const result = await fetch(url)
    const data = await result.json()
    console.log(data)
    setCompetition(data)
}
get_competitions()}
,[])
  
  return (

    <>
        <div className='competition'>
            <div className='competition-head'>
              <h3 className='competition-title'>
                Sacensibas
              </h3>
            </div>
            <div className='competition-block'>
              {competition.slice(0,4).map((obj) =>(
                <div key={obj["id"]} className="weekly-single club-elem">
                  <div className="weekly-img">
                      <img 
                      className='img-clubs' 
                      src={"http://164.92.147.233:8020/upload/" + obj["image"]}
                      alt="img"
                      />
                  </div>
                  <div className="weekly-caption">
                      <h4>
                      <Link to={`/PublicateCompetition/${obj.id}`}>{obj.header}</Link>
                        </h4>
                  </div>
                </div> 
              ))}
            </div>
        </div>
    </>
  )
}
