import React from 'react';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Main from './Components/Main/Main.jsx';
import Admin from './Pages/Admin/Admin.jsx'
import PublicatePosts from './Components/Main/MainComponents/TrendingArea/PublicatePosts/PublicatePosts.jsx';
import SeparationPosts from './Components/Main/MainComponents/TrendingArea/TrendingAreaComponents/SeparationPosts.jsx';
import PublicateCompetition from './Components/Main/MainComponents/TrendingArea/PublicateCompetition/PublicateCompetition.jsx';

import Documents from './Pages/Federacija/Documents/Documents.jsx';
  import Noteikumi from './Pages/Federacija/Documents/Noteikumi/Noteikumi.jsx';
  import Dopings from './Pages/Federacija/Documents/Dopings/Dopings.jsx';
  import GadaParaksti from './Pages/Federacija/Documents/GadaParaksti/GadaParaksti.jsx';
  import Biedri from './Pages/Federacija/Biedri/Biedri.jsx';
  import KopsapulcesProtokoli from './Pages/Federacija/Documents/KopsapulcesProtokoli/KopsapulcesProtokoli.jsx';
  import ValdesSedesProtokoli from './Pages/Federacija/Documents/ValdesSedesProtokoli/ValdesSedesProtokoli.jsx';
  import Budzets from './Pages/Federacija/Documents/Budzets/Budzets.jsx';
  import SacensibuRezultati from './Pages/Federacija/Documents/SacensibuRezultati/SacensibuRezultati.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/publicatePosts' element={<PublicatePosts/>}/>
          <Route path='/PublicateCompetition' element={<PublicateCompetition/>}/>
          {/* <Route path="/" element={<SeparationPosts />} />*/}
          {/* <Route path="/post" element={<PublicatePosts />} />  */}
          <Route path="/documents" element={<Documents />}>
            <Route path="noteikumi" element={<Noteikumi />} />
            <Route path="dopings" element={<Dopings />} />
            <Route path="gadaParaksti" element={<GadaParaksti />} />
            <Route path='kopsapulcesProtokoli' element={<KopsapulcesProtokoli/>}/>
            <Route path='valdesSedesProtokoli' element={<ValdesSedesProtokoli/>}/>
            <Route path='budzets' element={<Budzets/>}/>
            <Route path='sacensibuRezultati' element={<SacensibuRezultati/>}/>
          </Route>
          <Route path='/Biedri' element={<Biedri/>}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;