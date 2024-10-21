// src/Components/Main/Main.jsx
import React from 'react';
import TrendingArea from './MainComponents/TrendingArea/TrendingArea.jsx';
import FederationClubs from './MainComponents/ClubList/ClubsList.jsx';
import Competition from './MainComponents/Competition/Competition.jsx';
import Seminar from './MainComponents/Seminar/Seminar.jsx';
import YouTube from './MainComponents/YouTube/YouTube.jsx';
import backgroundImages from './OrhetComponents/Background/Background.jsx';
import './Main.scss'; // Импортируйте CSS-файл

const Main = () => {

    return (
        <main>
            <TrendingArea />
            <hr />
            <FederationClubs />
            <hr />
            <Competition />
            <hr />
            <Seminar />
            <hr />
            <YouTube />
            <hr />
        </main>
    );
};

export default Main;
