import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../landing/components/Navbar';
import Footer from '../../landing/components/Footer';
import ChangePasswordButton from '../components/ChangePasswordButton';
import '../styles/_user.scss';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);

    // Provide default fallback values for development/testing if user is empty
    const displayUser = user || {
        fullname: 'Test User',
        email: 'skyh53624@gmail.com',
        contact: '1231231231',
        role: 'seller',
    };

    return (
        <div className="user-profile-page texture-lines texture-grid">
            <Navbar />

            <main className="user-profile-main" id="main-content">
                <div className="user-profile-container">
                    {/* Section Header */}
                    <div className="user-profile-header">
                        <span className="user-profile-overline">01 / Account</span>
                        <h1 className="user-profile-title">User Profile</h1>
                    </div>

                    <hr className="editorial-divider editorial-divider--thin" />

                    {/* Profile details grid */}
                    <div className="user-profile-content">
                        <div className="user-details-card">
                            <div className="user-details-card__item">
                                <span className="user-details-card__label">Full Name</span>
                                <span className="user-details-card__value">{displayUser.fullname || 'N/A'}</span>
                            </div>
                            <div className="user-details-card__item">
                                <span className="user-details-card__label">Email Address</span>
                                <span className="user-details-card__value">{displayUser.email || 'N/A'}</span>
                            </div>
                            <div className="user-details-card__item">
                                <span className="user-details-card__label">Contact Number</span>
                                <span className="user-details-card__value">{displayUser.contact || 'N/A'}</span>
                            </div>
                            <div className="user-details-card__item">
                                <span className="user-details-card__label">Account Role</span>
                                <span className="user-details-card__value user-details-card__value--role">
                                    {displayUser.role || 'user'}
                                </span>
                            </div>
                        </div>

                        {/* Action Panel */}
                        <div className="user-profile-actions">
                            <ChangePasswordButton />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UserProfile;
