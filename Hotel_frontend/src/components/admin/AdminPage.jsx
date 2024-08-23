import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiServices from '../../service/ApiServices';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiServices.getUserProfile();
                setAdminName(response.user.name);
            } catch (err) {
                console.error('Error fetching admin details:', err.message);
            }
        }
        fetchAdminName();
    }, []);

    return (
        <div className="admin-page">
            <h1 className="welcome-message">Welcome, {adminName}</h1>
            <div className="admin-actions">
                <button className="admin-button" onClick={() => navigate('/admin/manage-rooms')}>
                    Manage Rooms
                </button>
                <button className="admin-button" onClick={() => navigate('/admin/manage-bookings')}>
                    Manage Bookings
                </button>
            </div>
        </div>
    );
}

export default AdminPage