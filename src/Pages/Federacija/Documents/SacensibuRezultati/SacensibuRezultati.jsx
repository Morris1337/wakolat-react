import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sacensibuRezultati.scss';

export default function SacensibuRezultati() {
  const [newsChamp, setNewsChamp] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState({}); // Состояние для отслеживания видимых мероприятий по годам

  useEffect(() => {
    async function get_news() {
      const url = "http://164.92.147.233:8020/api/get_news_champ";
      try {
        const result = await fetch(url);
        const data = await result.json();
        console.log(data);
        setNewsChamp(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    }
    get_news();
  }, []);

  const renderNewsWithYears = () => {
    let lastYear = null; // Переменная для хранения последнего отображенного года
    const yearBlocks = []; // Массив для группировки новостей по годам
    let currentBlock = []; // Текущий блок постов для года

    newsChamp.forEach((obj) => {
      const postYear = new Date(obj.date).getFullYear(); // Получаем год из даты поста

      // Если год изменился, создаем новый блок для года
      if (postYear !== lastYear) {
        // Если есть текущий блок, добавляем его в массив блоков
        if (currentBlock.length > 0) {
          yearBlocks.push(
            <React.Fragment key={lastYear}>
              <div className="last-competition-block">
                {currentBlock.slice(0, visibleEvents[lastYear] ? currentBlock.length : 4)} {/* Показываем только 4 или все мероприятия */}
              </div>
              {currentBlock.length > 4 && (
                <div className="show-more-container">
                  <button onClick={() => handleShowMore(lastYear)}>
                    {visibleEvents[lastYear] ? 'Скрыть' : 'Открыть больше'}
                  </button>
                </div>
              )}
            </React.Fragment>
          );
        }

        // Добавляем заголовок года
        yearBlocks.push(
          <h2 key={postYear} className="year-heading" onClick={() => handleYearClick(postYear)}>
            {postYear}
          </h2>
        );

        currentBlock = []; // Очищаем текущий блок для нового года
        lastYear = postYear;
      }

      currentBlock.push(
        <div className="last-competition" key={obj.id}>
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
                <Link to={`/PublicatePosts/${obj.id}`}>{obj.header}</Link>
              </h4>
            </div>
          </div>
        </div>
      );
    });

    // Добавляем последний год и его посты, если есть
    if (currentBlock.length > 0) {
      yearBlocks.push(
        <React.Fragment key={lastYear}>
          <div className="last-competition-block">
            {currentBlock.slice(0, visibleEvents[lastYear] ? currentBlock.length : 4)} {/* Показываем только 4 или все мероприятия */}
          </div>
          {currentBlock.length > 4 && (
            <div className="show-more-container">
              <button onClick={() => handleShowMore(lastYear)}>
                {visibleEvents[lastYear] ? 'Aizvert' : 'Atvert vairak'}
              </button>
            </div>
          )}
        </React.Fragment>
      );
    }

    return yearBlocks;
  };

  const handleShowMore = (year) => {
    setVisibleEvents((prev) => ({ ...prev, [year]: !prev[year] })); // Переключаем видимость мероприятий для выбранного года
  };

  const handleYearClick = (year) => {
    // При клике на год переключаем отображение всех мероприятий этого года
    setVisibleEvents((prev) => ({
      ...prev,
      [year]: prev[year] === undefined ? true : !prev[year] // Переключаем состояние видимости
    }));
  };

  return (
    <div>
      {renderNewsWithYears()}
    </div>
  );
}
