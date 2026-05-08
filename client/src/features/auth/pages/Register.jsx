import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import FormGroup from '../components/FormGroup';
import ContinueWithGoogle from '../components/ContinueWIthGoogle';
import '../styles/_auth.scss';
import { useAuth } from '../hook/useAuth';

const Register = () => {
    const { handleRegister } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        contact: '',
        password: '',
        isSeller: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullname, email, contact, password, isSeller } = formData;

        try {
            await handleRegister({ fullname, email, contact, password, isSeller });
            // navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Join us and start your journey.</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <FormGroup
                        label="Full Name"
                        id="fullname"
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                    />
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
                        label="Contact Number"
                        id="contact"
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Enter your contact number"
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

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="isSeller"
                            name="isSeller"
                            checked={formData.isSeller}
                            onChange={handleChange}
                        />
                        <label htmlFor="isSeller">Register as a seller</label>
                    </div>

                    <button
                        type="submit"
                        className="button primary-button full-width auth-button"
                    >
                        Register
                    </button>
                </form>

                <div className="auth-divider">OR</div>
                <ContinueWithGoogle />

                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
