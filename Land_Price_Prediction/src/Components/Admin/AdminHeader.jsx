import React from 'react';
import './AdminHeader.css'; // Import the CSS file

function AdminHeader() {
  return (
    <div className="admin-header">
      <div className="admin-header-left">
        <h2>Admin Panel</h2>
      </div>
      <div className="admin-header-right">
        <div className="admin-header-item">
          <i className="fas fa-bell"></i>
          <span className="notification-count">3</span>
        </div>
        <div className="admin-header-item">
          <i className="fas fa-user-circle"></i>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
