import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import CompetitonBlock from './CompetitonComponents/CompetitionBlock'
import "./Competition.scss"

export default function Competition() {

  const [competition, setCompetition] = useState([]);
    const navigate = useNavigate();

       const handleViewMore = () => {
        navigate('/documents/sacensibas');
    };

  useEffect(() => {
    async function get_competitions() {
        const url = "https://myproject123.zapto.org/api/competitions";
        
        try {
            const response = await fetch(url);
            
            // Проверяем успешность ответа
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            console.log("Competitions Data:", data);

            setCompetition(data);
        } catch (error) {
            console.error("Ошибка при загрузке соревнований:", error);
        }
    }

    get_competitions();
}, []);

  
  return (

    <>
        <div className='competition'>
            <div className='competition-head'>
              <h3 onClick={handleViewMore} className='competition-title'>
                Sacensības
              </h3>
            </div>
            <div className='competition-block'>
              {competition.slice(0,4).map((obj) =>(
                <div key={obj["id"]} className="weekly-single club-elem">
                  <div className="weekly-img-competition">
                      <img 
                      className='img-clubs' 
                      src={"https://myproject123.zapto.org/upload/" + obj["image"]}
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
