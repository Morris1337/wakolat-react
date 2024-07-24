import React from 'react'
import { Link } from 'react-router-dom';
import FullContactNoteikumi from './Full_contact_noteikumi_compressed.pdf'
import K1Noteikumi from './K_1_noteikumi_compressed.pdf'
import KickLightNoteikumiCompressed from './Kick_light_noteikumi_compressed.pdf'
import WAKOKikboksaNoteikumiCompressed from './WAKO_kikboksa_noteikumi_compressed.pdf'
import WAKORules25102022Compressed from './WAKO_Rules_25_10_2022_compressed.pdf'

export default function Noteikumi() {
        const openPdf = (url) => {
          window.open(url, '_blank');
        };
  return (
    <div className="content" id="noteikumi">
                <div>
                    <h2>
                        Wako noteikumi
                    </h2>
                </div>
                <div>
                    <p>
                        Lai iegūtu papildu informāciju vai skaidrojumus par WAKO noteikumiem, lūdzu, sazinieties ar:
                        Romeo Desa kungs, WAKO tehniskais direktors
                    </p>
                </div>
                <div className="noteikumiBlock">
                    <button className="noteikumiPdf" onClick={() => openPdf(FullContactNoteikumi)}>Full contact noteikumi</button>
                    <button className="noteikumiPdf" onClick={() => openPdf(K1Noteikumi)}>K-1 noteikumi</button>
                    <button className="noteikumiPdf" onClick={() => openPdf(KickLightNoteikumiCompressed)}>Kick light noteikumi</button>
                    <button className="noteikumiPdf" onClick={() => openPdf(WAKOKikboksaNoteikumiCompressed)}>WAKO kikboksa noteikumi</button>
                    <button className="noteikumiPdf" onClick={() => openPdf(WAKORules25102022Compressed)}>WAKO Rules 25 10 2022</button>
                </div>
            </div>
  )
}
