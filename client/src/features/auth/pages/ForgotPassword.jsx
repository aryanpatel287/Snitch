import React, { useState } from 'react';
import FormGroup from '../components/FormGroup';
import '../styles/_auth.scss';
import { Link } from 'react-router';
import { useAuth } from '../hook/useAuth';

const ForgotPassword = () => {
    const { handleForgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleForgotPassword({ email });
            setMessage('If an account exists, a password reset link has been sent to your email.');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Reset Password</h1>
                <p className="auth-subtitle">Enter your email to receive a reset link.</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <FormGroup
                        label="Email Address"
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                    />

                    <button
                        type="submit"
                        className="button primary-button full-width auth-button"
                    >
                        Send Reset Link
                    </button>
                </form>

                {message && (
                    <div className="auth-message">
                        <p>{message}</p>
                    </div>
                )}

                <div className="auth-footer">
                    <p>
                        Remembered your password?{' '}
                        <Link to="/login" className="auth-link">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
