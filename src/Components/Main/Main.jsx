import React from 'react';
import TrendingArea from './MainComponents/TrendingArea/TrendingArea.jsx';
import FederationClubs from './MainComponents/ClubList/ClubsList.jsx';
import Competition from './MainComponents/Competition/Competition.jsx';
import Seminar from './MainComponents/Seminar/Seminar.jsx';

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
        </main>
    );
}

export default Main;