import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sacensibuRezultati.scss';

export default function SacensibuRezultati() {
  const [newsChamp, setNewsChamp] = useState([]);
  const [expandedYears, setExpandedYears] = useState(new Set()); // Track expanded years

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    const url = "http://164.92.147.233:8020/api/get_news_champ";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          count: 100 // Requesting 100 events
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Полученные данные:', data);
      console.log('Количество мероприятий:', data.length);
  
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNewsChamp(sortedData);
      setExpandedYears((prev) => {
        const currentYear = new Date().getFullYear();
        return new Set(prev).add(currentYear); // Expand current year by default
      });
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  const toggleYear = (year) => {
    setExpandedYears((prev) => {
      const newExpandedYears = new Set(prev);
      if (newExpandedYears.has(year)) {
        newExpandedYears.delete(year); // Collapse if already expanded
      } else {
        newExpandedYears.add(year); // Expand if collapsed
      }
      return newExpandedYears;
    });
  };

  const renderNewsByYears = () => {
    let currentYear = null; 

    return newsChamp.map((obj) => {
      const postYear = new Date(obj.date).getFullYear(); 
      const isNewYear = postYear !== currentYear; 

      if (isNewYear) {
        currentYear = postYear;
      }

      return (
        <React.Fragment key={obj.id}>
          {isNewYear && (
            <div>
              <h2 className="year-heading" onClick={() => toggleYear(postYear)}>
                {postYear} {expandedYears.has(postYear) ? '-' : '+'} {/* Toggle icon */}
              </h2>
              {expandedYears.has(postYear) && (
                <div className="events-for-year">
                  {newsChamp
                    .filter(event => new Date(event.date).getFullYear() === postYear)
                    .map(event => (
                      <div className="last-competition" key={event.id}>
                        <div className="card">
                          <div className="img-block">
                            <img
                              src={`http://164.92.147.233:8020/upload/${event.image}`}
                              alt="img"
                              className="img"
                            />
                          </div>
                          <div className="date-block">
                            <h6 className="date">
                              <p>{event.date}</p>
                            </h6>
                          </div>
                          <div className="header-block">
                            <h4>
                              <Link to={`/PublicatePosts/${event.id}`}>
                                {event.header}
                              </Link>
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div >
      {renderNewsByYears()}
    </div>
  );
}
