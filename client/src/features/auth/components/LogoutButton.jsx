import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../hook/useAuth';
import '../../shared/styles/button.scss';

const LogoutButton = ({ className, onClick }) => {
    const { loading } = useSelector((state) => state.auth);
    const { handleLogout } = useAuth();

    const handleClick = () => {
        handleLogout();
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            className={className || "button secondary-button small-button"}
            onClick={handleClick}
            disabled={loading}
        >
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    );
};

export default LogoutButton;
