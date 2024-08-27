import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../../App.css'


const center = [56.970526405300845, 24.105032172615537];

const clubs = [
  { id: 1, lat: 56.97503238806344, lng: 24.14583519341057, name: "Boksa un kikboksa skola", address: "Klusā iela 12 K-3, Vidzemes priekšpilsēta, Rīga, LV-1013" },
  { id: 2, lat: 56.50599960117972, lng: 21.013090995234638, name: "Ballistic Boxing Club", address: "Malkas iela 4, Liepāja, LV-3401" },
  { id: 3, lat: 56.92233359052703, lng: 24.377900064461507, name: "Fun Catchers", address: "Zahārija Stopija iela 10, Upeslejas, Stopiņu pagasts, Ropažu novads, LV-2118" },
  { id: 4, lat: 56.35222775529394, lng: 26.18352253242222, name: "Sporta klubs SKITS", address: "Fabrikas iela 2, Līvāni, Līvānu pilsēta, Līvānu novads, LV-5316" },
  { id: 5, lat: 57.4016616157207, lng: 21.615607008059285, name: "S/K FAVORĪTS", address: "Mālu iela 10, Ventspils, LV-3604" },
  { id: 6, lat: 56.95839547145541, lng: 21.996679197664232, name: "CĪŅU KLUBS KULDĪGA", address: "Kuldīgas nov., Kuldīga, Vienības iela 87, LV-3301" },
  { id: 7, lat: 56.964148406214676, lng: 24.17692999766451, name: "Sporta klubs LTCS", address: "Rīga, Vaidavas iela 3 - 2, LV-1084" },
  { id: 8, lat: 57.352290780357784, lng: 25.33177955535511, name: "Top Ring", address: "Cēsu nov., Priekuļu pag., Pīlādži, LV-4116" },
  { id: 9, lat: 56.967041047030115, lng: 24.18131565533545, name: "MUAY THAI SPORTA SKOLA RĪGA", address: "Burtnieku iela 37" },
  { id: 10, lat: 56.967041047030115, lng: 24.18131565533545, name: "MUAY THAI SPORTA SKOLA RĪGA", address: "Rīgas 96. vidusskola, Auru iela 6A" },
  { id: 11, lat: 56.96445420539864, lng: 24.14083901115831, name: "MUAY THAI SPORTA SKOLA RĪGA", address: "Brīvības iela 148, LV-1012" },
  { id: 12, lat: 56.96445420539864, lng: 24.14083901115831, name: "Tkachenko Team", address: "Brīvības iela 148, LV-1012" },

  // Добавьте остальные клубы
];

const MapWithClubs = () => {
  const [zoom, setZoom] = useState(window.innerWidth >= 375 ? 7.5 : 20);

  const handleResize = () =>{
    if(window.innerWidth <= 375){
      setZoom(10)
    }else{
      setZoom(7.5)
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () =>{
      window.removeEventListener('resize', handleResize)
    }
  },[]);

  return (
    <MapContainer className='club-map-conteiner' center={center} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {clubs.map(club => (
        <Marker key={club.id} position={[club.lat, club.lng]}>
          <Popup>
            <h3>{club.name}</h3>
            <p>{club.address}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithClubs;
