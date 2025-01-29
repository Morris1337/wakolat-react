import React from 'react'
import '../documents.scss'
import sportistuRegistrs from './SportistuReģistrs2024.pdf'

export default function SportistuRegistrs() {
  return (
    <div className="pdf-container">
        <iframe 
        src={sportistuRegistrs} 
        className="pdf-viewer"
        title="Sportistu Registrs PDF"
      />
    </div>
  )
}
