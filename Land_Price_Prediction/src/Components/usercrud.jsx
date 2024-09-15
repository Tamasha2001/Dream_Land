import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', password: '', contact: '' });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
 
    useEffect(() => {
        fetchUsers();
    }, []);
 
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/getAllUsers');
            if (response.data.code === '00') {
                setUsers(response.data.content);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
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
                response = await axios.put('http://localhost:8080/api/v1/user/updateUser', { ...form, userID: editId });
            } else {
                response = await axios.post('http://localhost:8080/api/v1/user/saveUser', form);
            }
 
            if (response.data.code === '00') {
                setForm({ name: '', email: '', password: '', contact: '' });
                setEditMode(false);
                setEditId(null);
                fetchUsers();
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
 
    const handleEdit = (user) => {
        setForm({ name: user.name, email: user.email, password: '', contact: user.contact });
        setEditMode(true);
        setEditId(user.userID);
    };
 
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/user/deleteUser/${id}`);
            if (response.data.code === '00') {
                fetchUsers();
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
 
    return (
        <div>
            <h1>User Management</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contact:</label>
                    <input
                        type="text"
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{editMode ? 'Update' : 'Add'} User</button>
            </form>
 
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userID}>
                            <td>{user.userID}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.contact}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.userID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
 
export default UserCrud;
 
 