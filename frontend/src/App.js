import React, { useEffect, useState } from 'react';
import Header from './components/header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import axios from 'axios';

import Home from './pages/home';
import Vip from './pages/vip';
import News from './pages/noticias';
import Login from './pages/login';
import Register from './pages/register';
import Logout from './pages/logout';
import Profile from './pages/profile';
import ConfigUser from './pages/config';
import Emblems from './pages/emblems';

function hasJWT() {
  let flag = false;

  localStorage.getItem("token") ? flag = true : flag = false

  return flag
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        if (!localStorage.getItem('token')) {
          setUser(null);
          return;
        }

        const response = await axios.get('http://localhost:3000/user/get', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vip" element={hasJWT() ? <Vip /> : <Navigate to="/login" />} />
        <Route path="/news" element={hasJWT() ? <News /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={hasJWT() ? <Profile user={user} /> : <Navigate to="/login" />} />
        <Route path="/config" element={hasJWT() ? <ConfigUser user={user} /> : <Navigate to="/login" />} />
        <Route path="/emblems" element={hasJWT() ? <Emblems user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}