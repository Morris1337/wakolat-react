import React from 'react';
import TrendingArea from './MainComponents/TrendingArea/TrendingArea.jsx';
import FederationClubs from './MainComponents/ClubList/ClubsList.jsx';
import Competition from './MainComponents/Competition/Competition.jsx';
import Seminar from './MainComponents/Seminar/Seminar.jsx';
import YouTube from './MainComponents/YouTube/YouTube.jsx';

const Main = () => {
    return (
        <main>
            <TrendingArea></TrendingArea>
            <hr />
            <FederationClubs></FederationClubs>
            <hr />
            <Competition></Competition>
            <hr />
            <Seminar></Seminar>
            <hr />
            <YouTube/>
            <hr />
        </main>
    );
}

export default Main;