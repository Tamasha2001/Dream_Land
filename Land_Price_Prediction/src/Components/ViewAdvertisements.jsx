import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewAdvertisements.css';

const ViewAdvertisements = () => {
  const [lands, setLands] = useState([]);
  const [filteredLands, setFilteredLands] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLands();
  }, []);

  useEffect(() => {
    filterLands();
  }, [searchQuery, lands]);

  const fetchLands = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/land/getAllLands');
      setLands(response.data.content || []);
      setFilteredLands(response.data.content || []);
    } catch (error) {
      console.error('Error fetching lands:', error);
      setError('Failed to fetch lands');
    }
  };

  const filterLands = () => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = lands.filter(land =>
        land.address.toLowerCase().includes(query)
      );
      setFilteredLands(filtered);
    } else {
      setFilteredLands(lands);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h5>Search for the best land in your city easily.</h5><br></br>
          <div className="search-bar-container">
            <MDBInput
              type="text"
              placeholder="Enter land address or city"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input" style={{backgroundColor : 'white',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '1rem',
                marginRight: '10px',
                width: '500px'
              }}
            />
            <MDBBtn onClick={filterLands} className="search-btn">Search</MDBBtn>
          </div>
        </div>
      </section>

      <div className="container mt-4">
        {error && <p className="text-danger text-center">{error}</p>}
        <MDBRow>
          {filteredLands.map(land => (
            <MDBCol md='4' key={land.LandID} className='mb-4'>
              <MDBCard className="land-card">
                <MDBCardBody>
                  {land.image && (
                    <img
                      src={`http://localhost:8080/land-images/${land.image}`}
                      alt="Land"
                      className="img-fluid mb-3"
                    />
                  )}
                  <MDBCardTitle><strong>{land.address}</strong></MDBCardTitle>
                  <MDBCardText>
                    <strong>Type:</strong> {land.type}<br />
                    <strong>Size:</strong> {land.size} sqft<br />
                    <strong>Price:</strong> Rs {land.price.toLocaleString()}<br />
                    <strong>Contact:</strong> {land.contact}<br />
                    <strong>Description:</strong> {land.description}<br />
                    <strong>Posted Date:</strong> {land.postedDate}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    </div>
  );
};

export default ViewAdvertisements;
