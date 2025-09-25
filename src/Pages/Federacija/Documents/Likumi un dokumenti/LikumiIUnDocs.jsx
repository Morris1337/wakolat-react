import React, { useState, useEffect } from 'react';
import '../documents.scss';
import pdfFile from './Files/Trenera_sertifikācija_resertifikācija_nolikums.pdf'; // импортируем PDF

export default function LikumiIUnDocs() {
  const [selectedUrl, setSelectedUrl] = useState('');

  const iframeLinks = [
    {
      label: 'Sporta likums',
      url: 'https://m.likumi.lv/doc.php?id=68294',
    },
    {
      label: 'Sporta speciālists',
      url: 'https://m.likumi.lv/doc.php?id=204329&from=off',
    },
  ];

  useEffect(() => {
    setSelectedUrl(iframeLinks[0].url);
  }, []);

  const handleOpenPdf = () => {
    fetch(pdfFile)
      .then((res) => res.blob())
      .then((blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      })
      .catch((err) => {
        console.error('PDF atvēršanas kļūda:', err);
        alert('Neizdevās atvērt PDF failu.');
      });
  };

  return (
    <div className="content" id="noteikumi">
      <div>
        <h2>Likumi un dokumenti</h2>
      </div>

      <div className="noteikumiBlock">
        {iframeLinks.map((link, index) => (
          <button
            key={index}
            className="noteikumiPdf"
            onClick={() => setSelectedUrl(link.url)}
          >
            {link.label}
          </button>
        ))}
      </div>

      {selectedUrl && (
        <div className="iframeContainer" style={{ marginTop: '20px', width: '100%' }}>
          <iframe
            src={selectedUrl}
            title="Dokuments"
            width="100%"
            height="600px"
            style={{ border: '1px solid #ccc' }}
          />
        </div>
      )}

      {/* Кнопка для открытия PDF */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={handleOpenPdf}
          className="noteikumiPdf"
          style={{ padding: '10px 20px', marginTop: '10px',border: 'none' }}
        >
          📄 Trenera sertifikācija (PDF)
        </button>
      </div>
    </div>
  );
}
