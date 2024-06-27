import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Main from './Components/Main/Main.jsx';
import Admin from './Pages/Admin/Admin.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
      <div id='key'></div>
        <Header />
        {/* <div id='key'></div> */}
          <Routes>
            <Route
            path='/'
            element={<Main/>}
            >
            </Route>
            <Route
            path='/admin'
            element={<Admin/>}
            ></Route>
          </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;