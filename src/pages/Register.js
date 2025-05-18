import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/auth/register', form);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const onChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input name="name" placeholder="Full Name" required onChange={onChange} />
        <input name="phone" placeholder="Phone" required onChange={onChange} />
        <input name="email" type="email" placeholder="Email" required onChange={onChange} />
        <input name="password" type="password" placeholder="Password" required onChange={onChange} />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}
