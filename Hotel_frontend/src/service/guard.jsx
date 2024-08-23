import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import ApiServices from './ApiServices';


export const ProtectedRoute = ({ element: Component }) => {
    const location = useLocation();

    return ApiServices.isAuthenticated() ? (Component) : (<Navigate to="/login" replace state={{ form: location }} />)
}
export const AdminRoute = ({ element: Component }) => {
    const location = useLocation();

    return ApiServices.isAdmin() ? (Component) : (<Navigate to="/login" replace state={{ form: location }} />)
}
