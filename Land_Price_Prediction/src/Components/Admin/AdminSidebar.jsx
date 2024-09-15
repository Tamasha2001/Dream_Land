import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminSidebar.css';

function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="admin-sidebar vh-100 d-flex flex-column bg-dark text-light" style={{ width: '260px' }}>
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <Link 
            to="/admin-dashboard" 
            className={`nav-link ${location.pathname === '/admin-dashboard' ? 'active' : 'text-white'}`}
          >
            <i className="bi bi-speedometer me-2"></i>Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/manage-reports" 
            className={`nav-link ${location.pathname === '/admin/manage-reports' ? 'active' : 'text-white'}`}
          >
            <i className="bi bi-file-earmark-bar-graph me-2"></i>Manage Reports
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/view-users" 
            className={`nav-link ${location.pathname === '/admin/view-users' ? 'active' : 'text-white'}`}
          >
            <i className="bi bi-person-badge-fill me-2"></i>View Users
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/view-ads" 
            className={`nav-link ${location.pathname === '/admin/view-ads' ? 'active' : 'text-white'}`}
          >
            <i className="bi bi-megaphone-fill me-2"></i>View Advertisements
          </Link>
        </li>
      </ul>

      <div className="custom-margin">
      <hr className="border-light" />
      <li className="nav-item">
        <Link to="/admin-login" className="nav-link text-white">
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </Link>
      </li>
    </div>
    </div>
  );
}

export default AdminSidebar;
