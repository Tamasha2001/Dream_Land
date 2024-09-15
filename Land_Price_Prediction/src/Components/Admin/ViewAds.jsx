import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

function ViewAdvertisements() {
    const [lands, setLands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAdvertisements();
    }, []);

    const fetchAdvertisements = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/land/getAllLands');
            console.log(response.data); // Log the response for debugging
            if (response.data.code === '00') {
                setLands(response.data.content);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching advertisements:', error);
            setError('Failed to fetch advertisements.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex">
            <div className="flex-grow-1">
                <main style={{ padding: '20px' }}>
                    <h1 style={{ marginLeft: '25px', marginBottom: '15px' }}>View Advertisements</h1>
                    <MDBContainer fluid>
                        <MDBRow>
                            <MDBCol md="12">
                                {loading ? (
                                    <p>Loading advertisements...</p>
                                ) : error ? (
                                    <p>{error}</p>
                                ) : (
                                    <MDBTable className="mt-4">
                                        <MDBTableHead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Address</th>
                                                <th>Type</th>
                                                <th>Size</th>
                                                <th>Price</th>
                                                <th>Contact</th>
                                                <th>Description</th>
                                                <th>Posted Date</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {lands.length === 0 ? (
                                                <tr>
                                                    <td colSpan="9">No advertisements found.</td>
                                                </tr>
                                            ) : (
                                                lands.map(land => (
                                                    <tr key={land.landid}>
                                                        <td>{land.landid}</td>
                                                        <td>{land.address}</td>
                                                        <td>{land.type}</td>
                                                        <td>{land.size}</td>
                                                        <td>{land.price}</td>
                                                        <td>{land.contact}</td>
                                                        <td>{land.description}</td>
                                                        <td>{new Date(land.posted_date).toLocaleDateString()}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </MDBTableBody>
                                    </MDBTable>
                                )}
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>
        </div>
    );
}

export default ViewAdvertisements;
