import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerDash = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Navigation handlers
  const navigateToLandSale = () => {
    navigate('/landsale'); // Replace with the correct path
  };

  const navigateToLandRent = () => {
    navigate('/landrent'); // Replace with the correct path
  };

  const navigateToProfile = () => {
    navigate('/manage-profile'); // Replace with the correct path
  };

  return (
    <MDBContainer className="mt-5" style={{ paddingTop: '60px' }}>
      <h2 className="text-center mb-5">Customer Dashboard</h2>
      <MDBRow>
        <MDBCol md='4'>
          <MDBCard className="text-center h-100 card">
            <MDBCardBody>
              <MDBCardTitle>Land for Sale</MDBCardTitle>
              <MDBBtn color="primary" className="btn" onClick={navigateToLandSale}>View Lands for Sale</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='4'>
          <MDBCard className="text-center h-100 card">
            <MDBCardBody>
              <MDBCardTitle>Land for Rent</MDBCardTitle>
              <MDBBtn color="info" className="btn" onClick={navigateToLandRent}>View Lands for Rent</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='4'>
          <MDBCard className="text-center h-100 card">
            <MDBCardBody>
              <MDBCardTitle>Manage your Profile</MDBCardTitle>
              <MDBBtn color="success" className="btn" onClick={navigateToProfile}>Go to Profile</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <br></br><br></br><br></br><br></br>
    </MDBContainer>
  );
};

export default CustomerDash;
