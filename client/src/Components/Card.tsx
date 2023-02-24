import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { CardTypeProps, User } from '../types';
import Price from './Price';
import { CSSTransition } from 'react-transition-group'
import '../scss/Components/transition.scss'
import MapButton from './MapButton';
import LikeButton from './LikeButton';
import ProfileTitle from './ProfileTitle';

export default function Card({type, post}: CardTypeProps) {

  const [fullView, setFullView] = useState(false);

  const profileCardAnimation = () => {
    setFullView(!fullView)
  }

  return (
    <>
      {type === 'actual' &&
      
      <div 
          className={fullView? "card list__item" : "card list__item card_actual"} 
          onClick={() => setFullView(!fullView)} 
          onMouseLeave={() => setFullView(false)}
          >
        <img src={process.env.REACT_APP_URL +'../images/' + post.img} alt="" className="card__img" />
        
        <CSSTransition in={fullView} timeout={600} classNames="show" unmountOnExit>
          <MapButton link={post.link}/>
        </CSSTransition>
        
        <div className="card__info">
          <div className="card__price">
            <Price value={post.price} maxValue={3}/>
          </div>
          <h3 className="card__title">{post.title}</h3>
        </div>

        <div className="card__bottom">
          
          {fullView && <ProfileTitle userId={post.userId}/>}
          <LikeButton likes={post.likes} postId={post._id}/>

        </div>
      </div>}

      {type === 'feed' && 
      
      <div className="card list__item">
        <img src={process.env.REACT_APP_URL +'../images/' + post.img} alt="" className="card__img" />
        
        <MapButton link={post.link}/>
        
        <div className="card__info">
          <div className="card__price">
            <Price value={post.price} maxValue={3}/>
          </div>
          <h3 className="card__title">{post.title}</h3>
        </div>

        <div className="card__bottom">
          <ProfileTitle userId={post.userId}/>
          <LikeButton likes={post.likes} postId={post._id}/>
        </div>
        

      </div>}
      
      {type === 'profile' && 
      
      <div className={fullView? "card list__item" : "card list__item card_profile"}
           onMouseEnter={profileCardAnimation} 
           onMouseLeave={profileCardAnimation}>
        <img src={process.env.REACT_APP_URL +'../images/' + post.img} alt="" className="card__img" />
        
        <CSSTransition in={fullView} timeout={600} classNames="show" unmountOnExit>
          <MapButton link={post.link}/>
        </CSSTransition>
        
        <div className="card__info">
          <div className="card__price">
            <Price value={post.price} maxValue={3}/>
          </div>
          {fullView && <h3 className="card__title">{post.title}</h3>}
        </div>
        <div className="card__bottom">
          {fullView && <ProfileTitle userId={post.userId}/>}
          <LikeButton likes={post.likes} postId={post._id}/>
        </div>
      </div>}
    </>
  )
}
