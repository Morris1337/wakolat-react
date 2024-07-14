import React from 'react';
import '../post.scss';
import Contryes from '../../../OrhetComponents/contryes'

export default function SeminarPost() {
  return (
    <div className='post-component'>
        <div className='information'>
            <div>
                <label htmlFor="">Virsraksts</label>
                <input type="text" placeholder='Virsraksts' />
            </div>
            <div>
                <label htmlFor="">Foto</label>
                <input type="file" />
            </div>
            <div>
                <label htmlFor="">Datums</label>
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
                <label htmlFor="">Phone</label>
                <input type="tel" />
            </div>
            <div>
                <label htmlFor="">Pieteiksties lidz</label>
                <input type="datetime-local" />
            </div>
            <div>
                <label htmlFor="">Kontakta persona</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="">Pasakuma datums</label>
                <input type="datetime-local" />
            </div>
            <div>
                <label htmlFor="">Cena par piedališanu</label>
                <div className='cometition-coast'>
                    <input type="number"/>
                    <p>EUR</p>
                </div>
            </div>
        </div>
        <div className='more'>
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div className='button'>
            <button>Publicet</button>
        </div>
    </div>
  )
}
