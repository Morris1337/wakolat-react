import React from 'react'
import './valde.scss'
import darja from './DarjaS.jpg'
import Linda from './lindaAbele.jpg'
import Sanja from './Maslovs.jpeg'
import Igor from './igorsLikovs.jpg'
import vladimir from './vladimirsJeršovs.jpg'
import def from './image.png';

export default function Valde() {
  return (
    <div>
        <h1>
            Valde
        </h1>
        <div class="valde-president">
            <div class="valde">
                <div>
                    <img src={darja} alt="StrutinskaPhoto"/>
                </div>
                <div>
                    <h3>Darja Strutinska</h3>
                    <hr/>
                    <p class="status">VALDES PRIEKŠSĒDĒTĀJA</p>
                    <p><b>e-pasts:</b> darja.strutinska@wakolat.lv</p>
                </div>
            </div>
        </div>
        <div class="valde-other">
            <div class="valde">
                <div>
                    <img src={def} alt="AbelePhoto"/>
                </div>
                <div>
                    <h4>Linda Ābele</h4>
                    <hr/>
                    <p class="status">VICEPREZIDENTE</p>
                    <p><b>e-pasts:</b> boksaskola.riga@gmail.com</p>
                </div>
            </div>
            <div class="valde">
                <div>
                    <img src={def} alt="JersovsPhoto"/>
                </div>
                <div>
                    <h4>Vladimirs Jeršovs</h4>
                    <hr/>
                    <p class="status">ĢENERĀLSEKRETĀRS</p>
                    <p><b>e-pasts:</b> vladimirs.jersovs@wakolat.lv</p>
                </div>
            </div>
            <div class="valde">
                <div>
                    <img src={def} alt="LikovsPhoto"/>
                </div>
                <div>
                    <h4>Igors Likovs</h4>
                    <hr/>
                    <p class="status">VICEPREZIDENTS</p>
                    <p><b>e-pasts:</b> favoritigor@inbox.lv</p>
                </div>
            </div>
            <div class="valde">
                <div>
                    <img src={Sanja} alt="MaslovsPhoto"/>
                </div>
                <div>
                    <h4>Aleksandrs Maslovs</h4>
                    <hr/>
                    <p class="status">VALDES LOCEKLIS</p>
                    <p><b>e-pasts:</b> masliquefitness@gmail.com</p>
                </div>
            </div>
        </div>
    </div>
  )
}
