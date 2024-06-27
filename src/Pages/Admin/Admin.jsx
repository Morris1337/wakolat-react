import React, { Component } from 'react'

export default function Admin() {

    return (
        <div className="conteiner-admin">
          <div className="admin-menu admin-menu-phone">
            <div className="admin-menu-section">
              <div>
                <h2 style={{ color: 'white' }}>Administratora panelis</h2>
              </div>
              <div>
                <ul>
                  <li><button id="newsPost">Jauna publikācija</button></li>
                  <li><button id="competitionPost">Jaunas sacensības</button></li>
                  <li><button id="seminarPost">Jauns seminārs</button></li>
                  <li><button id="calendar">Kalendārs</button></li>
                </ul>
              </div>
            </div>
            <div className="admin-menu-icon-phone-block">
              <div className="triangle"></div>
            </div>
          </div>
          <div>
            <div id="conteiner-form">
              <div id="form"></div>
            </div>
          </div>
        </div>
      );
}
