import React from 'react';
import { useNavigate } from 'react-router';
import { SearchX } from 'lucide-react';
import '../styles/_error-page.scss';
import '../styles/button.scss';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <main className="error-page" role="main">
            <div className="error-page__content">
                <SearchX
                    size={64}
                    className="error-page__icon"
                    strokeWidth={1.5}
                />
                <h1 className="error-page__code">404</h1>
                <h2 className="error-page__title">Page Not Found</h2>
                <p className="error-page__description">
                    The page you are looking for might have been removed, had
                    its name changed, or is temporarily unavailable.
                </p>
                <div className="error-page__actions">
                    <button
                        className="button primary-button"
                        onClick={handleGoHome}
                        aria-label="Return home"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        </main>
    );
};

export default NotFoundPage;
