import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const uniqueAddresses = [
  'ranala', 'makandana', 'kaduwela', 'kesbewa', 'piliyandala', 'battaramulla',
  'malabe', 'nugegoda', 'bomiriya', 'thalawathugoda', 'madapatha', 'nawala',
  'dehiwala', 'kahathuduwa', 'homagama', 'mount lavinia', 'athurugiriya', 'bope',
  'boralesgamuwa', 'pitakotte', 'maharagama', 'hokandara', 'kirulapone',
  'diyagama', 'pannipitiya', 'havelock town', 'watareka', 'kottawa', 'padukka',
  'rathmalana', 'meegoda', 'habarakada', 'rajagiriya', 'dampe', 'kosgama',
  'avissawella', 'suwarapola', 'nawagamuwa', 'kalalgoda', 'bambalapitiya',
  'pitipana', 'borella', 'Narahenpita', 'kurunduwatta', 'ethulkotte', 'kohuwala',
  'kalubowila', 'thalahena', 'pepiliyana', 'panagoda', 'wellawatta', 'pagoda',
  'kollupitiya', 'bokundara', 'makumbura', 'mirihana', 'buthgamuwa',
  'kiriwattuduwa', 'mattegoda', 'hanwella', 'dedigamuwa', 'moratuwa', 'nedimala',
  'madiwela', 'attidiya', 'arangala', 'wijerama', 'kalapaluwawa', 'udahamulla',
  'thalapathpitiya', 'maradana', 'batuwandara', 'wellampitiya', 'koswatta',
  'rattanapitiya', 'katubedda', 'pothuarawa', 'uduwana', 'kotikawatta',
  'godagama', 'pinnawala', 'gothatuwa', 'welivita', 'pamunuwa', 'siddamulla',
  'waga', 'depanama', 'rathmaldeniya', 'himbutana', 'dematagoda', 'halpita',
  'mulleriyawa', 'batakettara', 'navinna', 'magammana', 'kawdana', 'katuwawala',
  'pamankada', 'mattakkuliya', 'rawathawatta', 'katukurunda', 'kadugoda', 'pore',
  'kahapola', 'grandpass', 'nampamunuwa', 'angulana', 'oruwala', 'mavittara',
  'makuludoowa', 'korathota', 'wattegedara', 'borupana', 'puwakpitiya',
  'bangalawatta', 'kolonnawa', 'thimbirigasyaya', 'mahalwarawa', 'kahahena',
  'jamburaliya', 'honnanthara', 'wickramasinghepura', 'werahera', 'bellanwila',
  'pelenwatta', 'divulpitiya', 'karagampitiya', 'jalthara', 'pahalawela',
  'kahawala', 'lakshapathiya', 'welihinda', 'thunadahena', 'neelammahara',
  'kumaragewatta', 'gangodawila', 'delthara', 'thunnana', 'wewala', 'aluthkade',
  'kolamunna', 'modara', 'moratumulla', 'malapalla', 'kaldemulla', 'pathiragoda',
  'thumbovila', 'uggalla', 'jambugasmulla', 'madampitiya', 'niwanthidiya',
  'kirigampamunuwa', 'gorakapitiya', 'rukmale', 'kelanimulla', 'slave island',
  'kotuvila', 'moonamale', 'palagama', 'batawala'
];

const landTypes = [
  'Residential', 'Residential, Other', 'Commercial, Residential, Other',
  'Commercial, Residential', 'Commercial',
  'Agricultural, Commercial, Residential, Other',
  'Agricultural, Commercial, Residential', 'Agricultural', 'Other',
  'Agricultural, Residential', 'Commercial, Other',
  'Agricultural, Residential, Other', 'Agricultural, Commercial',
  'Agricultural, Commercial, Other'
];

const priceScales = ['per perch', 'total price', 'per acre'];

const PredictLandPrice = () => {
  const [formData, setFormData] = useState({
    address: '',
    landSize: '',
    priceScale: 'per perch',
    landType: 'Residential',
    distanceFromFort: '',
    minDistGovtSchools: '',
    minDistUni: '',
    minDistExpress: '',
    minDistRailway: '',
    minDistBank: '',
    minDistHospital: '',
    minDistSupermarket: '',
    minDistFuelStation: ''
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        Address: formData.address,
        'Land_size(Perches)': parseFloat(formData.landSize) || 0,
        Price_Scale: formData.priceScale,
        Land_type: formData.landType,
        'Distance from fort': parseFloat(formData.distanceFromFort) || 0,
        min_dist_govtschools_b: parseFloat(formData.minDistGovtSchools) || 0,
        min_dist_uni: parseFloat(formData.minDistUni) || 0,
        min_dist_nearest_express: parseFloat(formData.minDistExpress) || 0,
        min_dist_nearest_railway: parseFloat(formData.minDistRailway) || 0,
        min_dist_nearest_bank: parseFloat(formData.minDistBank) || 0,
        min_dist_nearest_Govt_Hospital: parseFloat(formData.minDistHospital) || 0,
        min_dist_nearest_Supermarket: parseFloat(formData.minDistSupermarket) || 0,
        min_dist_nearest_Fuel_station: parseFloat(formData.minDistFuelStation) || 0,
      });
      setPredictedPrice(response.data.predicted_price);
      setError(null);
    } catch (error) {
      setError('Error predicting price. Please check the input data.');
      setPredictedPrice(null);
    }
  };

  return (
    <div className="container mt-5" style={{ paddingTop: '60px', paddingBottom: '1px' }}>
      <h2 className="text-center mb-4">Land Price Prediction</h2>
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="address" className="form-label">Address</label>
                <select className="form-select" id="address" name="address" value={formData.address} onChange={handleChange} required>
                  <option value="" disabled>Select Address</option>
                  {uniqueAddresses.map(address => (
                    <option key={address} value={address}>{address}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="landSize" className="form-label">Land Size (Perches)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="landSize" name="landSize" value={formData.landSize} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="priceScale" className="form-label">Price Scale</label>
                <select className="form-select" id="priceScale" name="priceScale" value={formData.priceScale} onChange={handleChange} required>
                  <option value="" disabled>Select Price Scale</option>
                  {priceScales.map(priceScale => (
                    <option key={priceScale} value={priceScale}>{priceScale}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="landType" className="form-label">Land Type</label>
                <select className="form-select" id="landType" name="landType" value={formData.landType} onChange={handleChange} required>
                  <option value="" disabled>Select Land Type</option>
                  {landTypes.map(landType => (
                    <option key={landType} value={landType}>{landType}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="distanceFromFort" className="form-label">Distance from Fort (km)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="distanceFromFort" name="distanceFromFort" value={formData.distanceFromFort} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="minDistGovtSchools" className="form-label">Min Distance to Govt. Schools (km)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="minDistGovtSchools" name="minDistGovtSchools" value={formData.minDistGovtSchools} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="minDistUni" className="form-label">Min Distance to University (km)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="minDistUni" name="minDistUni" value={formData.minDistUni} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="minDistExpress" className="form-label">Min Distance to Expressway (km)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="minDistExpress" name="minDistExpress" value={formData.minDistExpress} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="minDistRailway" className="form-label">Min Distance to Railway Station (km)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="minDistRailway" name="minDistRailway" value={formData.minDistRailway} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="minDistBank" className="form-label">Min Distance to Bank (km)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="minDistBank" name="minDistBank" value={formData.minDistBank} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="minDistHospital" className="form-label">Min Distance to Hospital (km)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="minDistHospital" name="minDistHospital" value={formData.minDistHospital} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="minDistSupermarket" className="form-label">Min Distance to Supermarket (km)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="minDistSupermarket" name="minDistSupermarket" value={formData.minDistSupermarket} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="minDistFuelStation" className="form-label">Min Distance to Fuel Station (km)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="minDistFuelStation" name="minDistFuelStation" value={formData.minDistFuelStation} onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Predict Price</button>
          </form>
          {predictedPrice !== null && (
            <div className="alert alert-success mt-3">
                <strong>Predicted Price:</strong> LKR {parseFloat(predictedPrice).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            )}

          {error && (
            <div className="alert alert-danger mt-3">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictLandPrice;
