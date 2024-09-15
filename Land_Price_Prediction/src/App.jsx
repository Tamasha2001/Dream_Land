import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Register from './Components/Register';
import Land from './Components/Land';
import LandSale from './Components/LandSale';
import LandRent from './Components/LandRent';
import ViewAdvertisements from './Components/ViewAdvertisements';
import LandPrediction from './Components/LandPrediction';
import PredictLandPrice from './Components/PredictLandPrice';
// import Ads from './Components/Ads'; // Uncomment when Ads component is ready
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ManageReports from './Components/Admin/ManageReports'; // Ensure the import path is correct
import ViewUsers from './Components/Admin/ViewUsers'; // Ensure the import path is correct
import ViewAds from './Components/Admin/ViewAds'; // Ensure the import path is correct
import AdminDashboardLayout from './Components/Admin/AdminDashboardLayout';
import CustomerDash from './Components/CustomerDash';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/login" element={<><Header /><Login /><Footer /></>} />
          <Route path="/register" element={<><Header /><Register /><Footer /></>} />
          <Route path="/ViewAdvertisements" element={<><Header /><ViewAdvertisements /><Footer /></>} />
          <Route path="/prediction" element={<><Header /><PredictLandPrice /><Footer /></>} />
          <Route path="/landsale" element={<><Header /><LandSale /><Footer /></>} />
          <Route path="/landrent" element={<><Header /><LandRent /><Footer /></>} />
          <Route path="/customer-dash" element={<><Header /><CustomerDash /><Footer /></>} />

          <Route path="/admin-login" element={<><Header /><AdminLogin /><Footer /></>} />
          
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboardLayout><AdminDashboard /></AdminDashboardLayout>} />
          <Route path="/admin/manage-reports" element={<AdminDashboardLayout><ManageReports /></AdminDashboardLayout>} />
          <Route path="/admin/view-users" element={<AdminDashboardLayout><ViewUsers /></AdminDashboardLayout>} />
          <Route path="/admin/view-ads" element={<AdminDashboardLayout><ViewAds /></AdminDashboardLayout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
