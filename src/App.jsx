import React from 'react';
import {HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Main from './Components/Main/Main.jsx';
import Admin from './Pages/Admin/Admin.jsx'
import PublicatePosts from './Components/Main/MainComponents/TrendingArea/PublicatePosts/PublicatePosts.jsx';
import SeparationPosts from './Components/Main/MainComponents/TrendingArea/TrendingAreaComponents/SeparationPosts.jsx';
import PublicateCompetition from './Components/Main/MainComponents/Competition/PublicateCompetition/PublicateCompetition.jsx';
import PublicateSeminar from './Components/Main/MainComponents/Seminar/SeminarPosts/PublicateSeminar.jsx';
import Kalendars from './Pages/Kalendars/Kalendars.jsx';
import backgroundImages from './Components/Main/OrhetComponents/Background/Background.jsx';

import Documents from './Pages/Federacija/Documents/Documents.jsx';
  import Noteikumi from './Pages/Federacija/Documents/Noteikumi/Noteikumi.jsx';
  import Dopings from './Pages/Federacija/Documents/Dopings/Dopings.jsx';
  import GadaParaksti from './Pages/Federacija/Documents/GadaParaksti/GadaParaksti.jsx';
  import Biedri from './Pages/Federacija/Biedri/Biedri.jsx';
  import KopsapulcesProtokoli from './Pages/Federacija/Documents/KopsapulcesProtokoli/KopsapulcesProtokoli.jsx';
  import ValdesSedesProtokoli from './Pages/Federacija/Documents/ValdesSedesProtokoli/ValdesSedesProtokoli.jsx';
  import Budzets from './Pages/Federacija/Documents/Budzets/Budzets.jsx';
  import SacensibuRezultati from './Pages/Federacija/Documents/SacensibuRezultati/SacensibuRezultati.jsx';
import Valde from './Pages/Federacija/Valde/Valde.jsx';
import Eksamenacija from './Pages/Eksamenacija/Eksamenacija.jsx';

function App() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const backgroundImage = backgroundImages[randomIndex];
    return (
    <HashRouter>
      <div className='App'>
        <Header />
        <div className='header-cube'></div>
        <div className="main-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='overlay'></div>
        <Routes className="content-wrapper">
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path='/main' element={<Main />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/publicatePosts/:id' element={<PublicatePosts/>}/>
          <Route path='/PublicateCompetition/:id' element={<PublicateCompetition/>}/>
          <Route path='/PublicateSeminar/:id' element={<PublicateSeminar/>}/>
          <Route path="/documents" element={<Documents />}>
            <Route path="noteikumi" element={<Noteikumi />} />
            <Route path="dopings" element={<Dopings />} />
            <Route path="gadaParaksti" element={<GadaParaksti />} />
            <Route path='kopsapulcesProtokoli' element={<KopsapulcesProtokoli/>}/>
            <Route path='valdesSedesProtokoli' element={<ValdesSedesProtokoli/>}/>
            <Route path='budzets' element={<Budzets/>}/>
            <Route path='sacensibuRezultati' element={<SacensibuRezultati/>}/>
            <Route path="" element={<Navigate to="noteikumi" />} />
          </Route>
          <Route path='/Biedri' element={<Biedri/>}></Route>
          <Route path='/Valde' element={<Valde/>}></Route>
          <Route path='/Kalendars' element={<Kalendars/>}></Route>
          <Route path='/Eksamenacija' element={<Eksamenacija/>}></Route>
        </Routes>
        </div>
        <div className='footer-cube'></div>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;