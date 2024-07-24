import React from 'react'
import { Link } from 'react-router-dom';
import './documents.scss'

export default function Documents() {

  return (
    <>
        <nav className='docs_menu'>
            <ul>
                <li><Link to="/documents/noteikumi">Noteikumi</Link></li>
                <li><Link to="/documents/dopings">Dopings</Link></li>
                <li><Link to="/documents/gada-paraksti">Gada pārskati</Link></li>
                <li><Link></Link></li>
                <li><Link></Link></li>
                <li><Link></Link></li>
                <li><Link></Link></li>
            </ul>
        </nav>
        <div>
          Place for content
        </div>
    </>
  )
}
