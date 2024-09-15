import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Register.css'; // Import the external CSS

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', contact: '' });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/register', form);
      if (response.data.code === '00') {
        setForm({ name: '', email: '', password: '', contact: '' });
        setError(null);
        window.alert('User registered successfully');
        navigate('/login'); // Use navigate to redirect
      } else {
        setError(response.data.message);
        window.alert(response.data.message); // Show error message as a popup
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user');
      window.alert('Error registering user'); // Show error message as a popup
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="left-image"></div>

        <div className="form-content">
          <h3 className="title">Sign Up</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="input-field"
              />
              <button type="button" onClick={toggleShowPassword} className="toggle-button">
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={form.contact}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
