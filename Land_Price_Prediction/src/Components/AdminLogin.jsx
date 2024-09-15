import React, { useState } from 'react';
import './Admin.css'; 

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with actual authentication logic
    if (username === 'admin' && password === '123') {
      // Successful login
      window.open('/admin-dashboard', '_blank'); // Open admin panel in a new tab
    } else {
      // Failed login
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      <section className="admin-login-section">
        <div className="admin-login-card">
          <h2 className="admin-login-heading">Admin Login</h2>
          <p className="admin-login-description">Please enter your credentials</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-login-input-group">
              <label htmlFor="username" className="admin-login-label">Username</label>
              <input 
                id="username"
                type="text"
                className="admin-login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="admin-login-input-group">
              <label htmlFor="password" className="admin-login-label">Password</label>
              <input 
                id="password"
                type="password"
                className="admin-login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="admin-login-error">{error}</p>}

            <button 
              className="admin-login-button"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
