import React from 'react'

export default function MapButton({link}: {link: string}) {
  return (
    <>
          <a href={link} className="map-button">
            <img src={require('../assets/images/map-icon.png')} alt="" />
          </a>
    </>
  )
}
