import React from 'react'

export default function YouTubeComponents({link, title, onClick, isActive}) {
  return (
    <div className={`youtube-component ${isActive ? 'active' : ''}`} onClick={onClick}>
        <div>
            <iframe 
            width="150"
            height="150"
            src= {link}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
            />
        </div>
        <div>
            <h5>
                <p>{title}</p>
            </h5>
        </div>
    </div>
  )
}
