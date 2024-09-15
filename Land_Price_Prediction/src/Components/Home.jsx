import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { FaRegMoneyBillAlt, FaDatabase, FaHeadset } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/prediction');
  };

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className={styles.home}>
        <div className={styles.hero}>
          <h1>Predicting Land Prices with Accuracy</h1>
          <p>Advanced Machine Learning Models for Accurate Land Price Estimations</p>
          <button className={styles.ctaButton} onClick={handleGetStarted}>Get Started</button>
        </div>
      </section><br></br><br></br><br></br>

      {/* About Us Section */}
      <section id="about" className={styles.about}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h2>About Us</h2>
            <p>We provide a state-of-the-art web application that predicts land prices in Colombo district, Sri Lanka. Our platform utilizes advanced machine learning techniques to ensure precise and up-to-date valuations, empowering users with the information they need to make informed decisions.</p>
          </div>
          <div id="about-img" className={styles.aboutImage}></div>
        </div>
      </section>

      {/* Services Section with Icons */}
      <section id="services" className={styles.services}>
        <h2>Our Services</h2>
        <div className={styles.serviceCards}>
          <div className={styles.serviceCard}>
            <FaRegMoneyBillAlt className={styles.serviceIcon} />
            <h3>Price Estimations</h3>
            <p>Accurately estimate the value of land based on various factors including location, size, and market trends.</p>
          </div>
          <div className={styles.serviceCard}>
            <FaDatabase className={styles.serviceIcon} />
            <h3>Provision of Data</h3>
            <p>Providing in-depth analytical information on market trends and data to provide insight into land price fluctuations.</p>
          </div>
          <div className={styles.serviceCard}>
            <FaHeadset className={styles.serviceIcon} />
            <h3>User Support</h3>
            <p>Our dedicated team is here to assist with any queries you have about land price predictions.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className={styles.gallery}>
        <h2>Gallery</h2>
        <div className={styles.galleryContainer}>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem} onClick={() => goToPage('/sales')}>
              <div className={styles.galleryImageSale}></div>
              <p className={styles.galleryText}>Land for Sale</p>
            </div>
            <div className={styles.galleryItem} onClick={() => goToPage('/rent')}>
              <div className={styles.galleryImageRent}></div>
              <p className={styles.galleryText}>Land for Rent</p>
            </div>
            <div className={styles.galleryItem} onClick={() => goToPage('/info')}>
              <div className={styles.galleryImageDevelopment}></div>
              <p className={styles.galleryText}>More Info</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.chartWrapper}></div>
          <div className={styles.contactWrapper}>
            <h2>Contact Us</h2>
            <p>We'd love to hear from you! Fill out the form below and we'll be in touch soon.</p>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Name</label>
                <input type="text" id="name" name="name" className={styles.formInput} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email</label>
                <input type="email" id="email" name="email" className={styles.formInput} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Message</label>
                <textarea id="message" name="message" className={styles.formTextarea} required></textarea>
              </div>
              <button type="submit" className={styles.formButton}>Submit</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
