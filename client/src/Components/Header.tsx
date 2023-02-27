import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import '../scss/Components/Header.scss';
import { User } from '../types';

interface toExitI {
  toExit?: boolean
}

export default function Header({toExit}: toExitI) {

  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState<User>()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/users?username=" + user.username);
      setCurrentUser(res.data)
    }
    fetchUser();
  },[user])

  return (
    <header className='header'>
      {!toExit 
      ? <a href={'/profile/' + user.username} className="header__profile">
          <div className="header__profile__name">{user.username}</div>
          <img src={user.profilePicture ? currentUser?.profilePicture : require('../assets/images/profile.png')}
            alt="Фотография профиля" 
            className="header__profile__img" />
        </a>
      : <a href="/login" onClick={()=>localStorage.setItem("user", "{}")} className="header__profile__logout">выйти</a>
      }
    </header>
  )
}
