import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandSale = () => {
  const [lands, setLands] = useState([]);
  const [form, setForm] = useState({
    address: '',
    type: '',
    size: '',
    description: '',
    price: '',
    contact: '',
    image: '',
  });
  const [image, setImage] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [editLandId, setEditLandId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/land/getAllLands');
      setLands(response.data.content || []);
    } catch (error) {
      console.error('Error fetching lands:', error);
      setError('Failed to fetch lands');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSaveLand = async (e) => {
    e.preventDefault();

    // Create FormData
    const formData = new FormData();
    formData.append('file', image);
    formData.append('landDTO', JSON.stringify(form));

    try {
      if (editLandId) {
        // Update land
        await axios.put(`http://localhost:8080/api/v1/land/updateLand/${editLandId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Land updated successfully');
      } else {
        // Add new land
        await axios.post('http://localhost:8080/api/v1/land/saveLand', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Land added successfully');
      }
      fetchLands();
      resetForm();
    } catch (error) {
      console.error('Error saving land:', error);
      setError('Failed to save/update land');
    }
  };

  const handleEdit = (land) => {
    setEditLandId(land.LandID);
    setForm({
      address: land.address,
      type: land.type,
      size: land.size,
      description: land.description,
      price: land.price,
      contact: land.contact,
      image: land.image
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/land/deleteLand/${id}`);
      if (response.data.code === '00') {
        fetchLands();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting land:', error);
    }
  };

  const handleSearchLand = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/land/searchLand/${searchId}`);
      if (response.data) {
        setForm(response.data);
      } else {
        alert('No land found with this ID');
      }
    } catch (error) {
      console.error('Error fetching land:', error);
      setError('Failed to fetch land');
    }
  };

  const resetForm = () => {
    setForm({
      address: '',
      type: '',
      size: '',
      description: '',
      price: '',
      contact: '',
      image: '',
    });
    setImage(null);
    setEditLandId(null);
  };

  return (
    <div className="container mt-4" style={{ paddingTop: '60px' }}>
      <h2>Land Management</h2>
      <form onSubmit={handleSaveLand}>
        <MDBRow className="mb-3">
          <MDBCol md='6'>
            <label className="form-label">Address</label>
            <input type="text" className="form-control" placeholder="Enter land address" name="address" value={form.address} onChange={handleInputChange} required />
          </MDBCol>
          <MDBCol md='6'>
            <label className="form-label">Type</label>
            <input type="text" className="form-control" placeholder="Enter land type" name="type" value={form.type} onChange={handleInputChange} required />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md='6'>
            <label className="form-label">Size</label>
            <input type="number" className="form-control" placeholder="Enter land size (in sqft)" name="size" value={form.size} onChange={handleInputChange} required />
          </MDBCol>
          <MDBCol md='6'>
            <label className="form-label">Price</label>
            <input type="number" className="form-control" placeholder="Enter land price" name="price" value={form.price} onChange={handleInputChange} required />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md='6'>
            <label className="form-label">Contact</label>
            <input type="number" className="form-control" placeholder="Enter contact number" name="contact" value={form.contact} onChange={handleInputChange} required />
          </MDBCol>
          <MDBCol md='6'>
            <label className="form-label">Description</label>
            <input type="text" className="form-control" placeholder="Enter land description" name="description" value={form.description} onChange={handleInputChange} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md='12'>
            <label className="form-label">Image</label>
            <input type="file" className="form-control" onChange={handleImageChange} />
          </MDBCol>
        </MDBRow>
        <MDBBtn className='mb-4' size='lg' type='submit'>{editLandId ? 'Update' : 'Add'} Land</MDBBtn>
        {error && <p className="text-danger text-center">{error}</p>}
      </form>
      <div className="mt-4 mb-4">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search Land by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          <button className="btn btn-outline-secondary" onClick={handleSearchLand}>Search</button>
        </div>
      </div>
      <MDBRow>
        {lands.map(land => (
          <MDBCol md='4' key={land.LandID} className='mb-4'>
            <MDBCard>
              <MDBCardBody>
                {land.image && (
                  <img
                    src={`http://localhost:8080/land-images/${land.image}`}
                    alt="Land"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
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
                  <strong>Posted Date:</strong> {land.postedDate} {/* Display the posted date */}
                </MDBCardText>
                <MDBBtn onClick={() => handleEdit(land)} color='warning' size='sm'>Edit</MDBBtn>&nbsp;
                <MDBBtn onClick={() => handleDelete(land.LandID)} color='danger' size='sm'>Delete</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
};

export default LandSale;
