import React from 'react';

const DashboardHome = ({ displayUser }) => {
    return (
        <div className="dashboard-home">
            <h1 className="dashboard-title">
                CHRONICLES OF MOTION.<br />
                Welcome back, <em>{displayUser.fullname}</em>.
            </h1>
            <p className="dashboard-home__subtitle">
                "/ VELOCITY: 100%. Progress is the constant refinement of details."
            </p>

            <div className="dashboard-home__status-card">
                <h3 className="status-title">System Status Monitor</h3>
                <div className="status-grid">
                    <div className="status-item">
                        <span className="status-label">Engine Status</span>
                        <span className="status-value status-value--active">Active</span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">Account Level</span>
                        <span className="status-value">{displayUser.role}</span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">Network Protocol</span>
                        <span className="status-value">Secure</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
