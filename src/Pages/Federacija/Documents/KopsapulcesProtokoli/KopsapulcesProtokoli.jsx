import React from 'react'
import prasibasFed from './PRASIBAS FEDERACIJU MAJASLAPA.docx'

export default function KopsapulcesProtokoli() {
  const openPdf = (url) => {
    window.open(url, '_blank');
  };
  return (
    <div>
      <div className="noteikumiBlock">
          <button className="noteikumiPdf" onClick={() => openPdf(prasibasFed)}>Full contact noteikumi</button>
          {/* <button className="noteikumiPdf" onClick={() => openPdf(K1Noteikumi)}>K-1 noteikumi</button> */}
          {/* <button className="noteikumiPdf" onClick={() => openPdf(KickLightNoteikumiCompressed)}>Kick light noteikumi</button> */}
          {/* <button className="noteikumiPdf" onClick={() => openPdf(WAKOKikboksaNoteikumiCompressed)}>WAKO kikboksa noteikumi</button> */}
          {/* <button className="noteikumiPdf" onClick={() => openPdf(WAKORules25102022Compressed)}>WAKO Rules 25 10 2022</button> */}
      </div>
    </div>
  )
}
