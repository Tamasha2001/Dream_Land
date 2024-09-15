import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardTitle,
  MDBCardText
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // Import MDB CSS

const LandCrud = () => {
  const [lands, setLands] = useState([]);
  const [form, setForm] = useState({
    address: '', landSize: '', landType: '', description: '', price: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/land/getAllLands');
      if (response.data.code === '00') {
        setLands(response.data.content);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching lands:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editMode) {
        response = await axios.put('http://localhost:8080/api/v1/land/updateLand', { ...form, landID: editId });
      } else {
        response = await axios.post('http://localhost:8080/api/v1/land/saveLand', form);
      }

      if (response.data.code === '00') {
        setForm({
          address: '', landSize: '', landType: '', description: '', price: ''
        });
        setEditMode(false);
        setEditId(null);
        fetchLands();
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form');
    }
  };

  const handleEdit = (land) => {
    setForm({
      address: land.address,
      landSize: land.landSize,
      landType: land.landType,
      description: land.description,
      price: land.price
    });
    setEditMode(true);
    setEditId(land.landID);
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

  return (
    <MDBContainer fluid style={{ paddingTop: '40px' }}>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow className='d-flex justify-content-center'>
            <MDBCol md='10' lg='8' className='d-flex flex-column align-items-center mb-4'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Land Management</p>

              <form onSubmit={handleSubmit} className="w-100">
                <MDBRow>
                  <MDBCol md='6'>
                    <div className="mb-4">
                      <MDBInput
                        label='Address'
                        id='form1'
                        type='text'
                        name='address'
                        value={form.address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <MDBInput
                        label='Land Size (Perches)'
                        id='form2'
                        type='text'
                        name='landSize'
                        value={form.landSize}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </MDBCol>

                  <MDBCol md='6'>
                    <div className="mb-4">
                      <MDBInput
                        label='Land Type'
                        id='form3'
                        type='text'
                        name='landType'
                        value={form.landType}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <MDBInput
                        label='Description'
                        id='form4'
                        type='text'
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <MDBInput
                        label='Price (Rs)'
                        id='form5'
                        type='number'
                        name='price'
                        value={form.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBBtn className='mb-4' size='lg' type='submit'>{editMode ? 'Update' : 'Add'} Land</MDBBtn>
                {error && <p className="text-danger text-center">{error}</p>}
              </form>
            </MDBCol>

            <MDBCol md='12'>
              <MDBRow>
                {lands.map(land => (
                  <MDBCol md='4' key={land.landID} className='mb-4'>
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardTitle>{land.address}</MDBCardTitle>
                        <MDBCardText>
                          <strong>Land Size:</strong> {land.landSize} Perches<br />
                          <strong>Land Type:</strong> {land.landType}<br />
                          <strong>Description:</strong> {land.description}<br />
                          <strong>Price:</strong> Rs {land.price.toLocaleString()}
                        </MDBCardText>
                        <MDBBtn onClick={() => handleEdit(land)} color='warning' size='sm'>Edit</MDBBtn>&nbsp;
                        <MDBBtn onClick={() => handleDelete(land.landID)} color='danger' size='sm'>Delete</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default LandCrud;
