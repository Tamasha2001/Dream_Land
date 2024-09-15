import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportsUpload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:8080/reports');
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleTitleChange = (e) => setTitle(e.target.value);

    const handleUpload = async () => {
        if (!file || !title) return; // Basic validation
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        try {
            await axios.post('http://localhost:8080/reports/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setTitle('');
            setFile(null);
            fetchReports(); // Refresh the report list
        } catch (error) {
            console.error('Error uploading report:', error);
        }
    };

    const viewReport = (filename) => {
        window.open(`http://localhost:8080/reports/${filename}`, '_blank');
    };

    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <nav className="bg-dark text-white p-3" style={{ width: '220px' }}>
                <h5>Admin Panel</h5>
                <ul className="nav flex-column mt-4">
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white" href="#">Dashboard</a>
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white active" href="#">Manage Reports</a>
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white" href="#">View Users</a>
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white" href="#">View Advertisements</a>
                    </li>
                </ul>
                <div className="mt-auto">
                    <a className="nav-link text-white" href="#">Logout</a>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-grow-1 p-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Manage Reports</h2>
                    <div>
                        <button className="btn btn-light me-2">
                            <i className="fas fa-bell"></i> <span className="badge bg-danger">3</span>
                        </button>
                        <button className="btn btn-light">
                            <i className="fas fa-user-circle"></i>
                        </button>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Report Title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <input
                        type="file"
                        className="form-control mb-2"
                        onChange={handleFileChange}
                    />
                    <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
                </div>

                {/* Reports List */}
                <h4 className="mb-3">Uploaded Reports</h4>
                <ul className="list-group">
                    {reports.map(report => (
                        <li key={report.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="text-truncate" style={{ maxWidth: '70%' }}>
                                {report.title}
                            </span>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => viewReport(report.filename)}>View</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReportsUpload;
