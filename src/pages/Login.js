import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/auth/login', { email, password });
      const token = res.headers['set-cookie'] || ''; // fallback
      onLogin(res.data.user, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          type="email" placeholder="Email" required
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="Password" required
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}
