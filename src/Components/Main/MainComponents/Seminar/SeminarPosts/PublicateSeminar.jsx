import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './publicateSeminar.scss';
import ScrollToTop from '../../../OrhetComponents/ScrollToTop';
import VFSBērniem from "../img/VFSBērniem.jpg"



function PublicateSeminar() {
  const { id } = useParams(); // Получаем id из URL
  const [publicateSeminar, setPublicateSeminar] = useState(null); // Исправляем начальное состояние

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
    async function get_one_seminar() {
      const url = `https://myproject123.zapto.org/api/seminars/${id}`; // Передаем ID в запрос
      try {
        const result = await fetch(url);
        const data = await result.json();
        console.log(data);
        setPublicateSeminar(data);
      } catch (error) {
        console.error("Ошибка загрузки данных соревнования:", error);
      }
    }

    get_one_seminar();
  }, [id]); // Добавляем зависимость от ID

  // Проверяем, загружены ли данные
  if (!publicateSeminar) {
    return <p>Loading...</p>;
  }
  return (
    <>
    <ScrollToTop />
    <div key={publicateSeminar.id} className="about-right mb-90">
      {/* Файл изображения */}
      <div className="about-img">
        <img src={`https://myproject123.zapto.org/upload/${publicateSeminar.image}`} alt="Kikboksa čempionāts 2023" />

        {/* Заголовок */}
        <div className="section-tittle mb-30 pt-30 competition-name">
          <h3>{publicateSeminar.header}</h3>
        </div>

        {/* Блок информации о соревнованиях */}
        <div className="competition-top-blocks">
          <div className="competition-top">
            {/* Страна */}
            <div className="competition-contry">
              <h5>Valsts:</h5>
              <h6>{publicateSeminar.country}</h6>
            </div>

            {/* Город */}
            <div className="competition-contry">
              <h5>Pilsēta:</h5>
              <h6>{publicateSeminar.city}</h6>
            </div>

            {/* E-mail */}
            <div className="competition-contry">
              <h5>E-pasts:</h5>
              <h6>{publicateSeminar.email}</h6>
            </div>

            {/* Номер телефона */}
            <div className="competition-contry">
              <h5>Tālrunis:</h5>
              <h6>{publicateSeminar.phone_number}</h6>
            </div>

            {/* Дата соревнований */}
            <div className="competition-contry">
              <h5>Seminara datums:</h5>
              <h6>{formatDate(publicateSeminar.date_start)}</h6>
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
              <h6>{formatDate(publicateSeminar.date_registration)}</h6>
              </div>
              <hr />
              {/* Взнос за участие */}
              <div>
                <h5>Dalības maksa</h5>
              </div>
              <div>
                <h6>{publicateSeminar.price}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div className='text-competition-content'>
            <div className='seminar-text' dangerouslySetInnerHTML={{ __html: publicateSeminar.text }}/>
        </div>
    </div>
    </>
    
  );
}

export default PublicateSeminar;
