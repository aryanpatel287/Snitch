import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const SellerProtectedPage = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading && !user) {
        return <div>Loading...</div>;
    }

    if (!loading && !user) {
        s;
        return <Navigate to="/login" replace />;
    }

    if (!loading && user.role !== 'seller') {
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default SellerProtectedPage;
