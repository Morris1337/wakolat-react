import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './documents.scss'

export default function Documents() {
  const navigate = useNavigate();
  return (
    <>
        <nav className='docs_menu'>
            <ul>
                <li className='li-header-link' onClick={() => navigate('noteikumi')}>Noteikumi</li>
                <li className='li-header-link' onClick={() => navigate('dopings')}>Dopings</li>
                <li className='li-header-link' onClick={() => navigate('gadaParaksti')}>Gada pārskati</li>
                <li className='li-header-link' onClick={() => navigate('kopsapulcesProtokoli')}>Kopsapulces protokoli</li>
                <li className='li-header-link' onClick={() => navigate('valdesSedesProtokoli')}>Valdes sēdes protokoli</li>
                <li className='li-header-link' onClick={() => navigate('budzets')}>Budžets</li>
                <li className='li-header-link' onClick={() => navigate('sacensibuRezultati')}>Sacensību rezultāti</li>
            </ul>
        </nav>
        <div className='docs_content'>
          <Outlet/>
        </div>
    </>
  )
}
