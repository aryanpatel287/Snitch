import React from 'react';
import { useNavigate } from 'react-router';
import { ShieldAlert } from 'lucide-react';
import '../styles/_error-page.scss';
import '../styles/button.scss';

const ForbiddenPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <main className="error-page" role="main">
            <div className="error-page__content">
                <ShieldAlert
                    size={64}
                    className="error-page__icon"
                    strokeWidth={1.5}
                />
                <h1 className="error-page__code">403</h1>
                <h2 className="error-page__title">Access Forbidden</h2>
                <p className="error-page__description">
                    You do not have the required permissions to access this
                    page. Please return to the previous page or navigate to the
                    home page.
                </p>
                <div className="error-page__actions">
                    <button
                        className="button secondary-button"
                        onClick={handleGoBack}
                        aria-label="Go back to previous page"
                    >
                        Go Back
                    </button>
                    <button
                        className="button primary-button"
                        onClick={handleGoHome}
                        aria-label="Go to home page"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ForbiddenPage;
