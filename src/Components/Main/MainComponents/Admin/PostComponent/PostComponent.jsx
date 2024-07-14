import React from 'react';
import '../post.scss';

export default function PostComponent() {
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
