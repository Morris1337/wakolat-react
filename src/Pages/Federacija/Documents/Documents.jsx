import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './documents.scss'

export default function Documents() {
  const navigate = useNavigate();
  return (
    <>
        <nav className='docs_menu'>
            <ul>
                <li onClick={() => navigate('noteikumi')}>Noteikumi</li>
                <li onClick={() => navigate('dopings')}>Dopings</li>
                <li onClick={() => navigate('gadaParaksti')}>Gada pārskati</li>
                <li><Link></Link></li>
                <li><Link></Link></li>
                <li><Link></Link></li>
                <li><Link></Link></li>
            </ul>
        </nav>
        <div className='docs_content'>
          <Outlet/>
        </div>
    </>
  )
}
