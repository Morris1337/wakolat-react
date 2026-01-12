import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './profile/Context/UserContext.js';
import './App.scss';
import useScrollToTop from "./hooks/useScrollToTop.js";

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
import LikumiIUnDocs from './Pages/Federacija/Documents/Likumi un dokumenti/LikumiIUnDocs.jsx';
import Dopings from './Pages/Federacija/Documents/Dopings/Dopings.jsx';
import GadaParaksti from './Pages/Federacija/Documents/GadaParaksti/GadaParaksti.jsx';
import Biedri from './Pages/Federacija/Biedri/Biedri.jsx';
import KopsapulcesProtokoli from './Pages/Federacija/Documents/KopsapulcesProtokoli/KopsapulcesProtokoli.jsx';
import ValdesSedesProtokoli from './Pages/Federacija/Documents/ValdesSedesProtokoli/ValdesSedesProtokoli.jsx';
import Budzets from './Pages/Federacija/Documents/Budzets/Budzets.jsx';
import SacensibuRezultati from './Pages/Federacija/Documents/SacensibuRezultati/SacensibuRezultati.jsx';
import SportistuRegistrs from './Pages/Federacija/Documents/SportistuRegistrs/SportistuRegistrs.jsx';
import Valde from './Pages/Federacija/Valde/Valde.jsx';
import Eksamenacija from './Pages/Eksamenacija/Eksamenacija.jsx';
import CompetitionsPage from './Pages/Federacija/Documents/GaidamasSacensibas/CompetitionsPage.jsx';
import Tiesniesi from './Pages/Federacija/Tiesniesi/Tiesniesi.jsx';

import Account from './profile/pages/account/Account.jsx';
import PrivateRoute from './routes.js';
import Profile from './profile/pages/account/profile/Profile.jsx';
import Activities from './profile/pages/account/activityes/Activities.jsx';
import Sacensibas from './profile/pages/account/Coach/Sacensibas/Sacensibas.jsx';
import CompetitionCategories from './profile/pages/account/Coach/Sacensibas/CompetitionCategories';
import AdminPanel from './profile/pages/account/adminPanel/AdminPanel.jsx';
import CreateActivity from './profile/pages/account/activityes/CreateActivity.jsx';
// import AthleteList from './profile/pages/account/';
import Fighter from './profile/pages/account/fighters/Fighter.jsx';
import EventsArchive from './profile/pages/account/activityes/EventsArchive.jsx';
import ActivityDetails from './profile/pages/account/activityes/ActivityDetails.jsx';
import UserPostProfile from './profile/pages/account/Publikacija/UserPost/UserPostProfile.jsx';
import Login from './profile/pages/account/LogIn/Login.jsx';
import Register from './profile/pages/account/Register/Register.jsx';
import { AuthProvider } from './profile/Context/AuthContext.jsx';
import RefereeTest from './Components/RefereeTest/RefereeTest.jsx';
import RefereeTestAdmin from './profile/pages/account/adminPanel/RefereeTestAdmin.jsx';
import Settings from './profile/pages/account/Settings/Settings.jsx';
import PostComponent from './Components/Main/MainComponents/Admin/PostComponent/PostComponent.jsx';
import TournamentAddParticipant from './profile/pages/account/Coach/Sacensibas/TournamentAddParticipant.jsx';
import CompetitionPairings from "./profile/pages/account/Coach/Sacensibas/CompetitionPairings";
import CompetitionSchedule from "./profile/pages/account/Coach/Sacensibas/CompetitionSchedule";

function App() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const backgroundImage = backgroundImages[randomIndex];

  const ScrollToTop = () => {
  useScrollToTop();
  return null; // ничего не рисуем, он только запускает хук
};

  return (
    <UserProvider>
    <HashRouter>
      <ScrollToTop />
      <AuthProvider>
      <div className="App">
        <Header />
        <div className="header-cube"></div>

        <div className="main-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="overlay"></div>

          {/* обёртка для стилизации вместо className на <Routes> */}
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Navigate to="/main" />} />
              <Route path="/main" element={<Main />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/publicatePosts/:id" element={<PublicatePosts />} />
              <Route path="/PublicateCompetition/:id" element={<PublicateCompetition />} />
              <Route path="/PublicateSeminar/:id" element={<PublicateSeminar />} />

              <Route path="/documents" element={<Documents />}>
                <Route path="noteikumi" element={<Noteikumi />} />
                <Route path="likUnDoc" element={<LikumiIUnDocs />} />
                <Route path="dopings" element={<Dopings />} />
                <Route path="gadaParaksti" element={<GadaParaksti />} />
                <Route path="kopsapulcesProtokoli" element={<KopsapulcesProtokoli />} />
                <Route path="valdesSedesProtokoli" element={<ValdesSedesProtokoli />} />
                <Route path="budzets" element={<Budzets />} />
                <Route path="sacensibuRezultati" element={<SacensibuRezultati />} />
                <Route path="sacensibas" element={<CompetitionsPage />} />
                {/* <Route path="/profile/sacensibas/:id/wako/participants" element={<TournamentAddParticipant />} /> */}
                {/* <Route path="/profile/sacensibas/:id/categories" element={<CompetitionCategories  />} /> */}
                <Route path="sportistuRegistrs" element={<SportistuRegistrs />} />
                <Route index element={<Navigate to="noteikumi" />} />
              </Route>
              <Route path="/referee-test" element={<RefereeTest />} />
              <Route path="/Biedri" element={<Biedri />} />
              <Route path="/Valde" element={<Valde />} />
              <Route path="/Tiesniesi" element={<Tiesniesi />} />
              <Route path="/Kalendars" element={<Kalendars />} />
              <Route path="/Eksamenacija" element={<Eksamenacija />} />
              <Route path="/settings" element={<Settings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
              <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>}>
                <Route path="profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>}>
                  <Route path="userPostProfile" element={<UserPostProfile />} />
                </Route>
                <Route path="activities" element={<PrivateRoute><Activities /></PrivateRoute>} />
                <Route path="sacensibasWako" element={<PrivateRoute><Sacensibas /></PrivateRoute>} />
                <Route
                  path="sacensibasWako/:id/wako/participants"
                  element={<PrivateRoute><TournamentAddParticipant /></PrivateRoute>}
                />  
                <Route path="sacensibasWako/:id/wako/pairings" element={<CompetitionPairings />} />
                <Route path="sacensibasWako/:id/wako/schedule" element={<CompetitionSchedule />} />
                <Route path="sacensibasWako/:id/wako/categories" element={<CompetitionCategories />} />
                <Route path="adminPanel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
                <Route path="refereeTestAdmin" element={<PrivateRoute><RefereeTestAdmin /></PrivateRoute>} />
                <Route path="createActivity" element={<PrivateRoute><CreateActivity /></PrivateRoute>} />
                <Route path="createNews" element={<PrivateRoute><PostComponent /></PrivateRoute>} />
                {/* <Route path="athleteList" element={<PrivateRoute><AthleteList /></PrivateRoute>} /> */}
                <Route path="fighter" element={<PrivateRoute><Fighter /></PrivateRoute>} />
              </Route>

              <Route path="/events" element={<EventsArchive />} />
              <Route path="/activity/:id" element={<ActivityDetails />} />
              <Route path="/activity/:id/categories" element={<CompetitionCategories />} />
              <Route path="/sacensibasWako/:id/wako/schedule" element={<CompetitionSchedule />} />
            </Routes>
          </div>
        </div>

        <div className="footer-cube"></div>
        <Footer />
      </div>
      </AuthProvider>
    </HashRouter>
    </UserProvider>
  );
}

export default App;
