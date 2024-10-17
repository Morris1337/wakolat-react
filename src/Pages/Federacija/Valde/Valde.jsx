import React from 'react'
import './valde.scss'
import darja from './darjaStrutinska1.jpg'
import Linda from './lindaAbele.jpg'
import Sanja from './aleksandrsMaslovs.jpg'
import Igor from './igorsLikovs.jpg'
import vladimir from './vladimirsJeršovs.jpg'

export default function Valde() {
  return (
    <div>
        <h1>
            Valde
        </h1>
        <div class="valde-president">
            <div class="valde">
                <div>
                    <img src={darja} alt="darjaStrutinskaPhoto"/>
                </div>
                <div>
                    <h3>Darja Srutinska</h3>
                    <hr/>
                    <p class="status">VALDES PRIEKŠSĒDĒTĀJS</p>
                </div>
            </div>
        </div>
        <div class="valde-other">
            <div class="valde">
                <div>
                    <img src={Linda} alt="darjaStrutinskaPhoto"/>
                </div>
                <div>
                    <h4>Linda Ābele</h4>
                    <hr/>
                    <p class="status">VICEPREZIDENTE</p>
                </div>
            </div>
            <div class="valde">
                <div>
                    <img src={Sanja} alt="darjaStrutinskaPhoto"/>
                </div>
                <div>
                    <h4>Aleksandrs Maslovs</h4>
                    <hr/>
                    <p class="status">VALDES LOCEKLIS</p>
                </div>
            </div>
            <div class="valde">
                <div>
                    <img src={Igor} alt="darjaStrutinskaPhoto"/>
                </div>
                <div>
                    <h4>Igors Likovs</h4>
                    <hr/>
                    <p class="status">VICEPREZIDENTE</p>
                </div>
            </div>
            <div class="valde">
                <div>
                    <img src={vladimir} alt="darjaStrutinskaPhoto"/>
                </div>
                <div>
                    <h4>Vladimirs Jeršovs</h4>
                    <hr/>
                    <p class="status">ĢENERĀLSEKRETĀRS</p>
                </div>
            </div>
        </div>
    </div>
  )
}
