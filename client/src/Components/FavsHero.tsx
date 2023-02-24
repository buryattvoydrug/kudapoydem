import React from 'react'
import '../scss/Components/Hero.scss';

export default function FavsHero() {
  return (
    <section className='hero'>
      <img className='hero__image hero__image_gif' src={require("../assets/images/favs.png")} alt="избранное" />
      <h1 className='hero__header'>Избранное</h1>
      <p className="hero__text">вам понравились эти места</p>
    </section>
  )
}
