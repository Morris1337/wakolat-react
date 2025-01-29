import React from 'react'
import '../documents.scss'
import sportistuRegistrs from './SportistuReģistrs2024.pdf'

export default function SportistuRegistrs() {
  return (
    // <div className="pdf-container">
    <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
        <iframe 
        src={sportistuRegistrs} 
        // className="pdf-viewer"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Sportistu Registrs PDF"
      />
    </div>
  )
}
