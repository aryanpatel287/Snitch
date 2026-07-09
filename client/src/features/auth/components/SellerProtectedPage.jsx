import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const SellerProtectedPage = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);
    const location = useLocation();
    const redirectPath = `${location.pathname}${location.search}`;

    if (loading && !user) {
        return <div>Loading...</div>;
    }

    if (!loading && !user) {
        return (
            <Navigate
                to={`/login?redirect=${encodeURIComponent(redirectPath)}`}
                replace
            />
        );
    }

    if (!loading && user.role !== 'seller') {
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default SellerProtectedPage;
