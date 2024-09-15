import React, { useState } from 'react';
import axios from 'axios';
 
const LandPrediction = () => {
  const [formData, setFormData] = useState({
    Address: '',
    Land_size: '',
    Price_Scale: '',
    Land_type: '',
    Distance_from_fort: '',
    min_dist_govtschools_b: '',
    min_dist_uni: '',
    min_dist_nearest_express: '',
    min_dist_nearest_railway: '',
    min_dist_nearest_bank: '',
    min_dist_nearest_Govt_Hospital: '',
    min_dist_nearest_Supermarket: '',
    min_dist_nearest_Fuel_station: ''
  });
 
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
 
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.predicted_price);
    } catch (err) {
      setError('An error occurred while fetching the prediction. Please check your input values.');
      console.error('Error:', err);
    }
  };
 
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Land Price Prediction</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="Address" style={styles.label}>Address:</label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="Land_size" style={styles.label}>Land Size (Perches):</label>
          <input
            type="number"
            id="Land_size"
            name="Land_size"
            value={formData.Land_size}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="Price_Scale" style={styles.label}>Price Scale:</label>
          <input
            type="text"
            id="Price_Scale"
            name="Price_Scale"
            value={formData.Price_Scale}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="Land_type" style={styles.label}>Land Type:</label>
          <input
            type="text"
            id="Land_type"
            name="Land_type"
            value={formData.Land_type}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="Distance_from_fort" style={styles.label}>Distance from Fort (km):</label>
          <input
            type="number"
            id="Distance_from_fort"
            name="Distance_from_fort"
            value={formData.Distance_from_fort}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="min_dist_govtschools_b" style={styles.label}>Min Distance to Government Schools (km):</label>
          <input
            type="number"
            id="min_dist_govtschools_b"
            name="min_dist_govtschools_b"
            value={formData.min_dist_govtschools_b}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="min_dist_uni" style={styles.label}>Min Distance to University (km):</label>
          <input
            type="number"
            id="min_dist_uni"
            name="min_dist_uni"
            value={formData.min_dist_uni}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="min_dist_nearest_express" style={styles.label}>Min Distance to Nearest Expressway (km):</label>
          <input
            type="number"
            id="min_dist_nearest_express"
            name="min_dist_nearest_express"
            value={formData.min_dist_nearest_express}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="min_dist_nearest_railway" style={styles.label}>Min Distance to Nearest Railway (km):</label>
          <input
            type="number"
            id="min_dist_nearest_railway"
            name="min_dist_nearest_railway"
            value={formData.min_dist_nearest_railway}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="min_dist_nearest_bank" style={styles.label}>Min Distance to Nearest Bank (km):</label>
          <input
            type="number"
            id="min_dist_nearest_bank"
            name="min_dist_nearest_bank"
            value={formData.min_dist_nearest_bank}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="min_dist_nearest_Govt_Hospital" style={styles.label}>Min Distance to Nearest Government Hospital (km):</label>
          <input
            type="number"
            id="min_dist_nearest_Govt_Hospital"
            name="min_dist_nearest_Govt_Hospital"
            value={formData.min_dist_nearest_Govt_Hospital}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="min_dist_nearest_Supermarket" style={styles.label}>Min Distance to Nearest Supermarket (km):</label>
          <input
            type="number"
            id="min_dist_nearest_Supermarket"
            name="min_dist_nearest_Supermarket"
            value={formData.min_dist_nearest_Supermarket}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="min_dist_nearest_Fuel_station" style={styles.label}>Min Distance to Nearest Fuel Station (km):</label>
          <input
            type="number"
            id="min_dist_nearest_Fuel_station"
            name="min_dist_nearest_Fuel_station"
            value={formData.min_dist_nearest_Fuel_station}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Predict</button>
      </form>
 
      {prediction && (
        <div style={styles.result}>
          <h3>Predicted Land Price: {prediction}</h3>
        </div>
      )}
 
      {error && (
        <div style={styles.error}>
          <h3>{error}</h3>
        </div>
      )}
    </div>
  );
};
 
// Inline styles for the component
const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    paddingTop: '70px',
    fontFamily: 'Arial, sans-serif',
  
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  submitButtonHover: {
    backgroundColor: '#218838'
  },
  result: {
    marginTop: '20px',
    textAlign: 'center',
    backgroundColor : 'Green'
  },
  error: {
    marginTop: '20px',
    color: 'red',
    textAlign: 'center'
  }
};
 
export default LandPrediction;
 
 