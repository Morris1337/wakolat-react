import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sacensibuRezultati.scss';

export default function SacensibuRezultati() {
  const [newsChamp, setNewsChamp] = useState([]);

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
          count: 100 // Например, запросить 100 мероприятий
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Полученные данные:', data);
      console.log('Количество мероприятий:', data.length); // Проверка количества полученных записей
  
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      setNewsChamp(sortedData);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };  


  const renderNewsByYears = () => {
    let currentYear = null; // Переменная для отслеживания смены года

    return newsChamp.map((obj) => {
      const postYear = new Date(obj.date).getFullYear(); // Получаем год поста
      const isNewYear = postYear !== currentYear; // Проверяем, изменился ли год

      // Если год изменился, обновляем currentYear и отображаем заголовок года
      if (isNewYear) {
        currentYear = postYear;
      }

      return (
        <React.Fragment key={obj.id}>
          {isNewYear && (
            <h2 className="year-heading">{postYear}</h2> // Отображаем год, если он изменился
          )}
          <div className="last-competition">
            <div className="card">
              <div className="img-block">
                <img
                  src={`http://164.92.147.233:8020/upload/${obj.image}`}
                  alt="img"
                  className="img"
                />
              </div>
              <div className="date-block">
                <h6 className="date">
                  <p>{obj.date}</p>
                </h6>
              </div>
              <div className="header-block">
                <h4>
                  <Link to={`/PublicatePosts/${obj.id}`}>
                    {obj.header}
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      {renderNewsByYears()}
    </div>
  );
}
