import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import NavBar from './components/NavBar';

axios.defaults.baseURL = 'https://family-backend-mcw8.onrender.com/api';
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Try auto login with stored token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally decode token or check user info via API
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    await axios.get('/auth/logout');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user && user.isAdmin ? <AdminPanel /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </>
  );
}

export default App;
