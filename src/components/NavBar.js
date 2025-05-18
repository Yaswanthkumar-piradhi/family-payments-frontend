import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">FamilyPayments</Link>
      <div>
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            {user.isAdmin && <Link to="/admin" className="admin-link">Admin Panel</Link>}
            <button onClick={onLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-link">Login</Link>
            <Link to="/register" className="btn-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
