import React, { useContext } from 'react'
import Main from './Pages/Main';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './scss/Components/App.scss'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import { AuthContext } from './Context/AuthContext';

function App() {

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="wrapper">
          <Router>
            <Routes>
              <Route path='/' element={user && Object.keys(user).length !== 0? <Main/> : <Navigate  to="/register"/>}/>
              <Route path='/login' element={user && Object.keys(user).length !== 0? <Navigate  to="/"/> : <Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/profile/:username' element={user && Object.keys(user).length !== 0? <Profile/> : <Navigate  to="/"/>}/>
            </Routes>
          </Router>
      </div>
    </>
  );
}

export default App;
