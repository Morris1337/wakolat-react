import React from 'react';
import './publicateSeminar.scss';
import VFSBērniem from "../img/VFSBērniem.jpg"



function PublicateSeminar() {
  return (
    <div className="about-right mb-90">
      {/* Файл изображения */}
      <div className="about-img">
        <img src={VFSBērniem} alt="Kikboksa čempionāts 2023" />

        {/* Заголовок */}
        <div className="section-tittle mb-30 pt-30 competition-name">
          <h3>Seminar</h3>
        </div>

        {/* Блок информации о соревнованиях */}
        <div className="competition-top-blocks">
          <div className="competition-top">
            {/* Страна */}
            <div className="competition-contry">
              <h5>Valsts:</h5>
              <h6>Latvija</h6>
            </div>

            {/* Город */}
            <div className="competition-contry">
              <h5>Pilsēta:</h5>
              <h6>Rīga</h6>
            </div>

            {/* E-mail */}
            <div className="competition-contry">
              <h5>E-pasts:</h5>
              <h6>wakolat@gmail.com</h6>
            </div>

            {/* Номер телефона */}
            <div className="competition-contry">
              <h5>Tālrunis:</h5>
              <h6>+371 12345678</h6>
            </div>

            {/* Дата соревнований */}
            <div className="competition-contry">
              <h5>Seminara datums:</h5>
              <h6>21.04.2023. - 23.04.2023</h6>
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
                <h6>18.04.2023</h6>
              </div>
              <hr />
              {/* Взнос за участие */}
              <div>
                <h5>Dalības maksa</h5>
              </div>
              <div>
                <h6>40 EUR</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div className='text-competition-content'>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                <br />Provident ullam nostrum minima ducimus error soluta aut molestias omnis necessitatibus. 
                <br />Illum qui labore nesciunt minima aliquid officia fugit iste, dignissimos laborum!
            </p>
        </div>
    </div>
  );
}

export default PublicateSeminar;
