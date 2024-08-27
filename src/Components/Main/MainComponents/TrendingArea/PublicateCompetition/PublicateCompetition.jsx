import React from 'react';
import './publicateCompetition.scss';
import topImg from './Baltic-Competition.png'; 
import Category from './Category.png'

function PublicateCompetition() {
  return (
    <div className="about-right mb-90">
      {/* Файл изображения */}
      <div className="about-img">
        <img src={topImg} alt="Kikboksa čempionāts 2023" />

        {/* Заголовок */}
        <div className="section-tittle mb-30 pt-30 competition-name">
          <h3>Kikboksa čempionāts 2023</h3>
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
              <h5>Sacensibas datums:</h5>
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
                <h6>20 EUR</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div className='compettition-category'>
        <img src={Category} alt="Category" />
      </div>
      <div className='text-competition-content'>
            <p>
                Prasības dalībniekiem un komandas nosūtošajām organizācijām
            <br />
            <br />1. Dalībniekiem jābūt līdzi personu apliecinošam dokumentam(pase, ID karte vai autovadītāja apliecība) un medicīniskajai izziņai. Sportisti bez medicīniskas izziņas piedalīties sacensībās nevarēs.
            <br />2. Iepriekš vienojoties ar sacensību organizātoriem, iespējams, sacensību tiesāšanā iesaistīt Jūsu kluba tiesnešus;
            <br /> 3. Dalībniekiem ir jābūt šadai formai: galvas ķivere ar slēgtu augšdaļu, kingi,apakšstilbu aizsargi, fūti, boksa cimdi 10 unces(AIBA standarts 283 gr.), bandāža, zobu aizsargs; sievietēm – krūšu aizsargs. Visiem dalībniekiem jābūt savam ekipējumam, kas atbilst starptautisko standartu prasībām.
            <br /> 4. Apbalvošana: medaļas, diplomi ,dāvanas.
            </p>
        </div>
    </div>
  );
}

export default PublicateCompetition;
