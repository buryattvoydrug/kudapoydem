import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import '../scss/Components/transition.scss'
import { User } from '../types';

export default function ProfileTitle({userId}: {userId: string}) {

    const [user, setUser] = useState<User>();

    useEffect(()=> {
      const fetchUser = async () => {
        const res = await axios.get('/api/users?userId=' + userId);
        setUser(res.data);
      }
      fetchUser();
    },[userId])
    
  return (
    <>
        <CSSTransition in={!!user} timeout={600} classNames="fadein" unmountOnExit>

        <a href={"/profile/" + user?.username} className="card-profile">
            <img className="card-profile__image" src={user?.profilePicture ? user.profilePicture : require('../assets/images/profile.png')} alt="" />
            <span className="card-profile__name">{user?.username}</span>
        </a>
        
        </CSSTransition>
    </>
  )
}
