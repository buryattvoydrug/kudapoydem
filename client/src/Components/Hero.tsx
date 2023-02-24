import React from 'react'
import '../scss/Components/Hero.scss';

export default function Hero() {
  return (
    <div className="container">
      <section className='hero'>
        <img className='hero__image hero__image_gif' src={require("../assets/images/fingers.gif")} alt="гифка" />
        <h1 className='hero__header'>куда пойдём?</h1>
        <p className="hero__text">делитесь хорошими заведениями и узнавайте новые</p>
      </section>
    </div>
    
  )
}
