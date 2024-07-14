import React from 'react';
import '../post.scss';
import Contryes from '../../../OrhetComponents/contryes'

export default function CalendarPost() {
  return (
    <div className='post-component'>
        <div className='information'>
            <div>
                <label htmlFor="">Virsraksts</label>
                <input type="text" placeholder='Virsraksts' />
            </div>
            <div>
                <label htmlFor="">Psakuma nosaukums</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="">Datums sakuma</label>
                <input type="date" />
            </div>
            <div>
                <label htmlFor="">Datums beiguma</label>
                <input type="date" />
            </div>
            <Contryes/>
            <div>
                <label htmlFor="">Adress</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="">E-pasts</label>
                <input type="email" />
            </div>
            <div>
                <label htmlFor="">Majas Lappa</label>
                <input type="url" />
            </div>
            <div>
                <label htmlFor="">Phone</label>
                <input type="tel" />
            </div>
            <div>
                <label htmlFor="">Promoter</label>
                <input type="datetime-local" />
            </div>
        </div>
        <div className='button'>
            <button>Publicet</button>
        </div>
    </div>
  )
}
