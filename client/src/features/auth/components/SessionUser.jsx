import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { User } from 'lucide-react';
import '../styles/_session-user.scss';

const SessionUser = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="session-user">
                <button
                    className="button primary-button small-button"
                    onClick={handleLoginRedirect}
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className="session-user">
            <div
                className="session-user__profile"
                title={user.fullname || user.email}
            >
                <div className="session-user__icon">
                    <User size={20} />
                </div>
                <span className="session-user__name">
                    {user.fullname || user.email || 'User'}
                </span>
            </div>
        </div>
    );
};

export default SessionUser;
