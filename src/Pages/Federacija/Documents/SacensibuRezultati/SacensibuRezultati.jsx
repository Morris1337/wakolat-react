import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sacensibuRezultati.scss';

export default function SacensibuRezultati() {
  const [newsChamp, setNewsChamp] = useState({});
  const [counts, setCounts] = useState({});
  const [activeYear, setActiveYear] = useState(null); // Хранит активный год

  useEffect(() => {
    // Изначально загружаем мероприятия для всех годов
    getNewsForYear();
  }, []);

  const getNewsForYear = async () => {
    const url = "http://164.92.147.233:8020/api/get_news_champ";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Пустое тело запроса
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Полученные данные:', data);

      // Группируем данные по годам
      const groupedByYear = data.reduce((acc, item) => {
        const postYear = new Date(item.date).getFullYear();
        if (!acc[postYear]) {
          acc[postYear] = [];
        }
        acc[postYear].push(item);
        return acc;
      }, {});

      console.log('Группировка по годам:', groupedByYear);
      setNewsChamp(groupedByYear);

      // Устанавливаем начальные значения для количества отображаемых мероприятий
      const initialCounts = {};
      const currentYear = new Date().getFullYear();

      for (let year = currentYear; year > currentYear - 5; year--) {
        initialCounts[year] = groupedByYear[year] ? 0 : 0; // Обнуляем счетчик для всех лет
      }
      
      if (groupedByYear[currentYear]) {
        initialCounts[currentYear] = 4; // Показываем 4 для текущего года
      }

      console.log('Начальные значения счетчиков:', initialCounts);
      setCounts(initialCounts);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  const renderNewsWithYears = () => {
    const currentYear = new Date().getFullYear();
    const last5Years = [];

    // Формируем массив последних 5 лет
    for (let year = currentYear; year > currentYear - 5; year--) {
      last5Years.push(year);
    }

    return last5Years.map((year) => {
      const yearNews = newsChamp[year] || [];
      const visibleCount = counts[year] || 0; // Отображаем только visibleCount элементов

      return (
        <React.Fragment key={year}>
          <h2
            className="year-heading"
            onClick={() => handleYearClick(year)}
          >
            {year}
          </h2>
          {activeYear === year && ( // Проверяем активный год
            <div className="last-competition-block">
              {yearNews.slice(0, visibleCount).map((obj) => (
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
                        <Link to={`/PublicatePosts/${obj.id}`}>
                          {obj.header}
                        </Link>
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
              {yearNews.length > visibleCount && (
                <div className="show-more-container">
                  <button onClick={() => handleShowMore(year)}>
                    Открыть больше
                  </button>
                </div>
              )}
              {visibleCount > 4 && (
                <div className="show-more-container">
                  <button onClick={() => handleShowLess(year)}>
                    Скрыть
                  </button>
                </div>
              )}
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  const handleShowMore = (year) => {
    const newCount = (counts[year] || 0) + 4; // Увеличиваем количество отображаемых элементов на 4
    setCounts((prev) => ({
      ...prev,
      [year]: newCount,
    }));
  };

  const handleShowLess = (year) => {
    setCounts((prev) => ({
      ...prev,
      [year]: 4, // Сбрасываем количество элементов до 4 для конкретного года
    }));
  };

  const handleYearClick = (year) => {
    if (activeYear === year) {
      setActiveYear(null); // Скрыть мероприятия, если активный год повторно нажат
    } else {
      setActiveYear(year); // Устанавливаем выбранный год как активный
      setCounts((prev) => ({
        ...prev,
        [year]: prev[year] === 0 ? 4 : prev[year], // Если ранее количество было 0, показываем 4
      }));
    }
  };

  return (
    <div>
      {renderNewsWithYears()}
    </div>
  );
}
