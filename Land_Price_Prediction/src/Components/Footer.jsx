import React from 'react';
import { MDBBtn, MDBIcon, MDBContainer } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './footer.module.css'; // Ensure this path matches your CSS module file

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>© 2024 My Land Price Prediction App. All rights reserved.</p>
        <div className={styles.contact}>
          <p>
            Contact us: 
            <a href="mailto:support@example.com" className={styles.email}> dreamland@pricepredict.com</a> | 
            Phone: <a href="tel:+1234567890" className={styles.phone}>+94 11 2 560 560</a>
          </p>
        </div>
        
        {/* Social Media Icons Section */}
        <div className={styles.socialMedia}>
          <MDBContainer className='p-4 pb-0'>
            <section className='mb-4'>
              <MDBBtn floating className={`${styles.socialLink} m-1`} style={{ backgroundColor: '#3b5998' }} href='https://facebook.com' role='button'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>
              <MDBBtn floating className={`${styles.socialLink} m-1`} style={{ backgroundColor: '#55acee' }} href='https://twitter.com' role='button'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>
              <MDBBtn floating className={`${styles.socialLink} m-1`} style={{ backgroundColor: '#dd4b39' }} href='https://google.com' role='button'>
                <MDBIcon fab icon='google' />
              </MDBBtn>
              <MDBBtn floating className={`${styles.socialLink} m-1`} style={{ backgroundColor: '#ac2bac' }} href='https://instagram.com' role='button'>
                <MDBIcon fab icon='instagram' />
              </MDBBtn>
              <MDBBtn floating className={`${styles.socialLink} m-1`} style={{ backgroundColor: '#0082ca' }} href='https://linkedin.com' role='button'>
                <MDBIcon fab icon='linkedin-in' />
              </MDBBtn>
              <MDBBtn floating className={`${styles.socialLink} m-1`} style={{ backgroundColor: '#333333' }} href='https://github.com' role='button'>
                <MDBIcon fab icon='github' />
              </MDBBtn>
            </section>
          </MDBContainer>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
