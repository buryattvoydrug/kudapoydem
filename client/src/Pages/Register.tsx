import React, { useRef } from 'react'
import '../scss/Components/Auth.scss'
import Hero from '../Components/Hero'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Register() {

  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordAgain = useRef<HTMLInputElement>(null);
  const history = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordAgain.current!.value !== password.current!.value) {
      passwordAgain.current!.setCustomValidity("Пароли не совпадают");
    } else {
      const user = {
        username: username.current!.value,
        email: email.current!.value,
        password: password.current!.value,
      };
      try {
        await axios.post("/api/auth/register", user);
        history("/login");
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <Hero />
      <div className='container'>
        <div className="register">
          <h2 className="register__title">Регистрация</h2>
          <form onSubmit={handleSubmit} className="register__form">
            <input className='register__form__input' required ref={username} autoComplete="new-text" type="text" placeholder='логин' />
            <input className='register__form__input' required ref={email} autoComplete="new-email" type="email" placeholder='email' />
            <input className='register__form__input' required ref={password} autoComplete="new-password" type="password" placeholder='пароль' />
            <input className='register__form__input' required ref={passwordAgain} autoComplete="new-password" type="password" placeholder='повторите пароль' />
            <button type="submit" className="primary-button register__button_primary">зарегистрироваться</button>
          </form>
          <div className="register__text">
            <span>Уже зарегистрированы? </span>
            <a href="/login">Войти</a>
          </div>
        </div>
      </div>
    </>
  )
}
