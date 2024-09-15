import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './Login.css'; // Import the external CSS

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        window.alert('Login successful!'); // Show success message
        navigate('/customer-dash'); // Redirect to the customer dashboard
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert('Invalid credentials'); // Show invalid credentials message
      } else {
        window.alert('Login failed'); // Show generic failure message
      }
    }
  };

  return (
    <MDBContainer fluid className="login-container">
      <MDBRow className="align-items-center">
        <MDBCol col="12" md="6" className="login-image-col">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample"
          />
        </MDBCol>

        <MDBCol col="12" md="6">
          <div className="login-form-container">
            <form onSubmit={handleLogin} className="login-form">
              <h2 className="text-center mb-4">Login</h2>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
                required
              />

              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox name="flexCheck" id="flexCheckDefault" label="Remember me" />
                <a href="#!">Forgot password?</a>
              </div>

              <div className="text-center mt-4">
                <MDBBtn className="login-button" size="lg" type="submit">
                  Login
                </MDBBtn>
                <p className="small mt-2">
                  Don't have an account? <a href="/register" className="link-danger">Register</a>
                </p>
              </div>
            </form>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
