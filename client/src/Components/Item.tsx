import React from 'react'

export default function Item() {
  return (
    <div className="card card_actual list__item">
      <img src={require('../assets/images/card.png')} alt="" className="card__img" />
      <button className="map-button">
        <img src={require('../assets/images/map-icon.png')} alt="" />
      </button>
      <div className="card__info">
        <div className="card__price">
          <img src={require('../assets/images/price.png')} alt="" />
          <img src={require('../assets/images/price.png')} alt="" />
          <img src={require('../assets/images/price.png')} alt="" />
        </div>
        <h3 className="card__title">Пицца 22 сантиметра</h3>
      </div>
      <div className="card__bottom">
        <div className="card-profile">
          <img className="card-profile__image" src={require('../assets/images/profile.png')} alt="" />
          <span className="card-profile__name">Игорь Радимов</span>
        </div>
        <div className="card__likes-info">
          <button className="card__like">
            <img src={require('../assets/images/heart.png')} alt="like" />
            <span className="card__counter-likes">23</span>
          </button>
        </div>
      </div>
    </div>
  )
}
