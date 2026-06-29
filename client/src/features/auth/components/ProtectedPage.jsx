import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ProtectedPage = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading && !user) {
        return <div>Loading...</div>;
    }

    if (!loading && !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedPage;
