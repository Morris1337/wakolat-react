import React, { useState } from 'react';
import './budzets.scss';

import one from './LKF_2024_1_pielikums_Tāme(09.07).pdf';
import two from './LKF_2024_2_pielikums _Atskaite(09.07)1-2cet.pdf';
import three from './LKF_2024_2_pielikums _Atskaite(09.07)3 cet.pdf';
import four from './LKF_2024_2_pielikums _Atskaite(09.07)4cet..pdf';

export default function Budzets() {
  const [openYear, setOpenYear] = useState(null);

  const toggleYear = (year) => {
    setOpenYear(prev => prev === year ? null : year);
  };

  const openPdf = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="budzets-container">
      <h2>Budzets</h2>

      {/* === 2025 === */}
      <div>
        <h3 className="year-button" onClick={() => toggleYear(2025)}>2025</h3>
        {openYear === 2025 && (
          <div className="file-list">
            <p>Faili par 2025. gadu pagaidām nav pievienoti.</p>
          </div>
        )}
      </div>

      {/* === 2024 === */}
      <div>
        <h3 className="year-button" onClick={() => toggleYear(2024)}>2024</h3>
        {openYear === 2024 && (
          <div className="file-list">
            <button className="file-button" onClick={() => openPdf(one)}>LKF 2024 1 pielikums Tāme (09.07)</button>
            <button className="file-button" onClick={() => openPdf(two)}>LKF 2024 2 pielikums Atskaite (1-2 cet)</button>
            <button className="file-button" onClick={() => openPdf(three)}>LKF 2024 2 pielikums Atskaite (3 cet)</button>
            <button className="file-button" onClick={() => openPdf(four)}>LKF 2024 2 pielikums Atskaite (4 cet)</button>
          </div>
        )}
      </div>

      {/* === 2023 === */}
      <div>
        <h3 className="year-button" onClick={() => toggleYear(2023)}>2023</h3>
        {openYear === 2023 && (
          <div className="file-list">
            <p>Faili par 2023. gadu pagaidām nav pievienoti.</p>
          </div>
        )}
      </div>
    </div>
  );
}
