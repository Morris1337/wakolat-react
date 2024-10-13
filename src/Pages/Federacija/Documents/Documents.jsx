import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './documents.scss';

export default function Documents() {
  const navigate = useNavigate();
  const location = useLocation();

  // Переход по умолчанию к первой графе 'noteikumi' только если путь пуст
  useEffect(() => {
    if (location.pathname === '/documents') {
      navigate('noteikumi');
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <nav className='docs_menu'>
        <ul>
          <li className='li-header-link' onClick={() => navigate('noteikumi')}>Noteikumi</li>
          <li className='li-header-link' onClick={() => navigate('dopings')}>Dopings</li>
          <li className='li-header-link' onClick={() => navigate('gadaParaksti')}>Gada pārskati</li>
          <li className='li-header-link' onClick={() => navigate('kopsapulcesProtokoli')}>Kopsapulces protokoli</li>
          <li className='li-header-link' onClick={() => navigate('valdesSedesProtokoli')}>Valdes sēdes протokoli</li>
          <li className='li-header-link' onClick={() => navigate('budzets')}>Budžets</li>
          <li className='li-header-link' onClick={() => navigate('sacensibuRezultati')}>Sacensību rezultāti</li>
        </ul>
      </nav>
      <div className='docs_content'>
        <Outlet/>
      </div>
    </>
  );
}
