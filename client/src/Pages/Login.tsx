import React, { useContext, useRef } from 'react'
import '../scss/Components/Auth.scss'
import Hero from '../Components/Hero'
import axios from 'axios';
import { AuthCallAssetsI } from '../types';
import { Dispatch } from 'redux';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(AuthContext);


  const loginCall = async (userCredential: AuthCallAssetsI, dispatch: Dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      let errorMessage = "Ошибка авторизации!";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data;
      }
      alert(errorMessage);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginCall(
      { email: email.current!.value, password: password.current!.value },
      dispatch
    );
  };

  return (
    <>
      <Hero/>
      <div className='container'>
        <div className="register">
          <h2 className="register__title">Вход</h2>
          <form onSubmit={handleSubmit} className="register__form">
            <input className='register__form__input' required ref={email} autoComplete="new-email" type="email" placeholder='email' />
            <input className='register__form__input' required ref={password} autoComplete="new-password" type="password" placeholder='пароль' />
            <button type="submit" className="primary-button register__button_primary">войти</button>
          </form>
          <div className="register__text">
            <span>Еще не зарегистрированы? </span>
            <a href="/register">Регистрация</a>
          </div>
        </div>
      </div>
    </>
  )
}
