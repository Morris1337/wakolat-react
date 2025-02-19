import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './publicateCompetition.scss';
import topImg from './Baltic-Competition.png'; 
import Category from './Category.png';
import ScrollToTop from '../../../OrhetComponents/ScrollToTop';

export default function PublicateCompetition() {
  const { id } = useParams(); // Получаем id из URL
  const [publicateCompetition, setPublicateCompetition] = useState(null); // Исправляем начальное состояние

  function formatDate(dateString) {
    if (!dateString) {
      return ""; // Если дата отсутствует, вернуть пустую строку
    }
    const date = new Date(dateString);
    if (isNaN(date)) {
      return ""; // Если дата некорректна, вернуть пустую строку
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    const hours = dateString.includes("T") // Проверяем наличие времени в строке
      ? String(date.getHours()).padStart(2, '0')
      : "";
    const minutes = dateString.includes("T") // Проверяем наличие минут
      ? String(date.getMinutes()).padStart(2, '0')
      : "";
    return hours && minutes
      ? `${day}/${month}/${year}, ${hours}:${minutes}`
      : `${day}/${month}/${year}`;
  }
  
  

useEffect(() => {
    async function get_one_competition() {
      const url = "https://myproject123.zapto.org/api/get_one_competition"; // Передаем ID в запрос
      try {
        const result = await fetch(url, {
          method: 'POST', // Метод запроса
          headers: {
              'Content-Type': 'application/json', // Указываем тип содержимого
          },
          body: JSON.stringify({"id": id}), // Преобразуем объект в JSON
      });
        const data = await result.json();
        console.log(data);
        setPublicateCompetition(data);
      } catch (error) {
        console.error("Ошибка загрузки данных соревнования:", error);
      }
    }

    get_one_competition();
  }, [id]); // Добавляем зависимость от ID

  // Проверяем, загружены ли данные
  if (!publicateCompetition) {
    return <p>Loading...</p>;
  }

  // Отображаем информацию о соревновании
  return (
    <>
      <ScrollToTop />
      <div key={publicateCompetition.id} className="about-right mb-90">
        {/* Файл изображения */}
        <div className="about-img">
          <img src={`https://myproject123.zapto.org/upload/${publicateCompetition.image}`} alt="Top-Img" />

          {/* Заголовок */}
          <div className="section-tittle mb-30 pt-30 competition-name">
            <h3>{publicateCompetition.header}</h3>
          </div>

          {/* Блок информации о соревнованиях */}
          <div className="competition-top-blocks">
            <div className="competition-top">
              {/* Страна */}
              <div className="competition-contry">
                <h5>Valsts:</h5>
                <h6>{publicateCompetition.country}</h6>
              </div>
              {/* Город */}
              <div className="competition-contry">
                <h5>Pilsēta:</h5>
                <h6>{publicateCompetition.city}</h6>
              </div>

              {/* E-mail */}
              <div className="competition-contry">
                <h5>E-pasts:</h5>
                <h6>{publicateCompetition.email}</h6>
              </div>

              {/* Номер телефона */}
              <div className="competition-contry">
                <h5>Tālrunis:</h5>
                <h6>{publicateCompetition.phone_number}</h6>
              </div>

              {/* Дата соревнований */}
              <div className="competition-contry">
                <h5>Sacensības datums:</h5>
                <h6>
                  {formatDate(publicateCompetition.date_start)} - {formatDate(publicateCompetition.date_end)}
                </h6>
              </div>
            </div>

            <div className="competition-top-vertical-line"></div>

            <div className="competition-top">
              <div>
                {/* Срок подачи заявок */}
                <div>
                  <h5>
                    Pieteikumu iesniegšanas <br />
                    termiņš
                  </h5>
                </div>
                <div>
                   <h6>{formatDate(publicateCompetition.date_registration)}</h6>
                </div>
                <hr />
                {/* Взнос за участие */}
                <div>
                  <h5>Dalības maksa</h5>
                </div>
                <div>
                  <h6>{publicateCompetition.price} EUR</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className='competition-category'>
          <a href={`https://myproject123.zapto.org/upload/${publicateCompetition.image_second}`} target="_blank" rel="noopener noreferrer" className='dynamic-button'>
          Atvērt nolikumu
          </a>
        </div>
        <div className='text-competition-content'>
          <div 
            dangerouslySetInnerHTML={{ __html: publicateCompetition.text }}
          />
        </div>
      </div>
    </>
  );
}
