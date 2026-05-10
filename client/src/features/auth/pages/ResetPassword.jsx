import React, { useState } from 'react';
import FormGroup from '../../shared/components/FormGroup';
import '../styles/_auth.scss';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../hook/useAuth';

const ResetPassword = () => {
    const { handleResetPassword } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleResetPassword({ token, password });
            setMessage('Password successfully reset. Redirecting...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.log(error);
            setMessage('Failed to reset password. The link might be expired.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Set New Password</h1>
                <p className="auth-subtitle">Enter your new secure password below.</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <FormGroup
                        label="New Password"
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your new password"
                    />

                    <button
                        type="submit"
                        className="button primary-button full-width auth-button"
                    >
                        Update Password
                    </button>
                </form>

                {message && (
                    <div className="auth-message">
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
