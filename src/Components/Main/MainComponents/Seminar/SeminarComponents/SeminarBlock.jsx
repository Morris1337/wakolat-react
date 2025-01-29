import React, {useState, useEffect} from 'react'

export default function SeminarBlock() {
  const [seminars, setSeminars] = useState([])
    useEffect(()=>{async function get_seminars() {
        const url = "https://myproject123.zapto.org/api/get_seminars"
        const result = await fetch(url)
        const data = await result.json()
        console.log(data)
        setSeminars(data)
    }
get_seminars()}
,[])
  return (
    <>
    {seminars.map((obj) => 
    <div key={obj["id"]} className="weekly-single club-elem">
        <div className="weekly-img">
            <img className='img-clubs' src={"https://myproject123.zapto.org/upload/" + obj["image"]} alt="img"/>
        </div>
        <div className="weekly-caption">
            <span className="color1">Federācijas klubi</span>
            <h4><a>{obj["header"]}</a></h4>
        </div>
    </div> 
    )}
  </>
  )
}
