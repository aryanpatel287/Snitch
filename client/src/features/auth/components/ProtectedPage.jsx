import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const ProtectedPage = ({ children }) => {
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

    return children;
};

export default ProtectedPage;
