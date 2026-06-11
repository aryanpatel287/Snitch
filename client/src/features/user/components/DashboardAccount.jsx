import React from 'react';
import ChangePasswordButton from './ChangePasswordButton';

const DashboardAccount = ({ displayUser }) => {
    return (
        <div className="dashboard-account">
            <span className="dashboard-overline">02 / ACCOUNT DETAILS</span>
            <h1 className="dashboard-title">My Settings</h1>

            <div className="dashboard-account__grid">
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

                <div className="dashboard-account__actions">
                    <ChangePasswordButton />
                </div>
            </div>
        </div>
    );
};

export default DashboardAccount;
