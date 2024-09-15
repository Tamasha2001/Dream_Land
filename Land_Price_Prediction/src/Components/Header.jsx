import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa'; // Using react-icons for the admin icon
import styles from './header.module.css'; // Ensure this path matches your CSS module file

export default function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Updated to navigate to the admin login form
  const handleAdminClick = () => {
    navigate('/admin-login'); // Navigate to the admin login form
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>DREAM LAND</div>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li><a href="#home" onClick={() => navigate('/')}>Home</a></li>
          <li><a href="" onClick={() => navigate('/viewAdvertisements')}>Advertisement</a></li>
          <li><a href="" onClick={() => navigate('/prediction')}>Prediction</a></li>
          <li><a href="#about" onClick={() => navigate('/')}>About</a></li>
          <li><a href="#contact" onClick={() => navigate('/')}>Contact</a></li>
        </ul>
      </nav>
      <div className={styles.buttons}>
        <button onClick={handleLoginClick} className={styles.loginButton}>Login</button>
        <button onClick={handleRegisterClick} className={styles.registerButton}>Sign up</button>
        {/* Admin Icon - Navigate to admin login form */}
        <FaUserShield 
          className={styles.adminIcon} 
          onClick={handleAdminClick} 
          title="Admin Login"
        />
      </div>
    </header>
  );
}
