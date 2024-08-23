import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiServices from '../../service/ApiServices';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiServices.getUserProfile();
                console.log(user)
                setUser(response.user);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUserProfile();
    }, []);

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure want to delete your account?')) {
            return;
        }
        try {
            await ApiServices.deleteRooms(user.id);
            navigate('/signup');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="edit-profile-page">
            <h2>Edit Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <button className="delete-profile-button" onClick={handleDeleteProfile}>Delete Profile</button>
                </div>
            )}
        </div>
    );
}

export default EditProfilePage