import React, { useState } from 'react';
import FormGroup from '../../shared/components/FormGroup';
import ContinueWithGoogle from '../components/ContinueWIthGoogle';
import '../styles/_auth.scss';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hook/useAuth';

const Login = () => {
    const { handleLogin } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        try {
            await handleLogin({ email, password });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Log in to your account.</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <FormGroup
                        label="Email Address"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                    />
                    <FormGroup
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />

                    <div className="auth-meta">
                        <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="button primary-button full-width auth-button"
                    >
                        Log In
                    </button>
                </form>

                <div className="auth-divider">OR</div>
                <ContinueWithGoogle />

                <div className="auth-footer">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="auth-link">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
