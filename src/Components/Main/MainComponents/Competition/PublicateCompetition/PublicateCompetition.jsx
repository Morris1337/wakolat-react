import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './publicateCompetition.scss';
import topImg from './Baltic-Competition.png'; 
import Category from './Category.png';
import ScrollToTop from '../../../OrhetComponents/ScrollToTop';

export default function PublicateCompetition() {
  const { id } = useParams(); // Получаем id из URL
  const [publicateCompetition, setPublicateCompetition] = useState(null); // Исправляем начальное состояние

useEffect(() => {
    async function get_one_competition() {
      const url = "http://164.92.147.233:8020/api/get_one_competition/"; // Передаем ID в запрос
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
          <img src={`http://164.92.147.233:8020/upload/${publicateCompetition.image}`} alt="Top-Img" />

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
                <h6>{publicateCompetition.date_start} - {publicateCompetition.date_end}</h6>
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
                  <h6>{publicateCompetition.date_registration}</h6>
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
          <a href={`http://164.92.147.233:8020/upload/${publicateCompetition.image_second}`} target="_blank" rel="noopener noreferrer">
            Открыть PDF
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
