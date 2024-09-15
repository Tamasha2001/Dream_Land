import React from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from './AdminSidebar';
import styles from './AdminDashboard.module.css';


function AdminDashboard() {
  return (
    <div style={{ marginLeft: '240px', marginTop: '50px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard.</p>
    </div>
  );
}

export default AdminDashboard;
