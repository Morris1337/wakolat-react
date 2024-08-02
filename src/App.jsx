import React from 'react';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Main from './Components/Main/Main.jsx';
import Admin from './Pages/Admin/Admin.jsx'
import PublicatePosts from './Components/Main/MainComponents/TrendingArea/PublicatePosts/PublicatePosts.jsx';

import Documents from './Pages/Federacija/Documents/Documents.jsx';
  import Noteikumi from './Pages/Federacija/Documents/Noteikumi/Noteikumi.jsx';
  import Dopings from './Pages/Federacija/Documents/Dopings/Dopings.jsx';
  import GadaParaksti from './Pages/Federacija/Documents/GadaParaksti/GadaParaksti.jsx';
  import Biedri from './Pages/Federacija/Biedri/Biedri.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/publicatePosts' element={<PublicatePosts/>}/>
          <Route path="/documents/*" element={<Documents />}></Route>
          <Route path='/Noteikumi' element={<Noteikumi/>}></Route>
          <Route path='/GadaParaksti' element={<GadaParaksti/>}></Route>
          <Route path='/Dopings' element={<Dopings/>}></Route>
          <Route path='/Biedri' element={<Biedri/>}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;