import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './profile/Context/UserContext'; // Импортируем контекст
import Login from './profile/pages/account/LogIn/Login'; // Импортируем окно входа


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    
    const location = useLocation();
    if (loading) return null; // или спиннер
    if (!user) {
        return <Login closeModal={() => {}} redirectPath={location.pathname} />;
    }

    return children;
};

export default PrivateRoute;
