import React from 'react'

export default function YouTubeComponents({link, title}) {
  return (
    <div>
        <div>
            <link rel="stylesheet" href={link}/>
        </div>
        <div>
            <h5>
                <p>{title}</p>
            </h5>
        </div>
    </div>
  )
}
