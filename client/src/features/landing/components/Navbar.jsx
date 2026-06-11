import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isMenuOpen ? 'navbar--open' : ''}`}>
            <div className="navbar__container">
                <Link to="/" className="navbar__wordmark" onClick={() => setIsMenuOpen(false)}>
                    SNITCH
                </Link>
                
                <div className="navbar__mobile-actions">
                    <Link 
                        to={user ? "/profile" : "/login?redirect=/profile"} 
                        className="navbar__profile-mobile"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="User Profile"
                    >
                        <i className="ri-user-line"></i>
                    </Link>
                    <button 
                        className="navbar__toggle" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMenuOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-line"></i>}
                    </button>
                </div>

                <div className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}>
                    <a href="#collections" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Collections</a>
                    <a href="#story" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Story</a>
                    <a href="#editorial" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Editorial</a>

                    {user ? (
                        <>
                            {user.role === 'seller' && (
                                <Link to="/seller/create-product" className="navbar__link" onClick={() => setIsMenuOpen(false)}>
                                    Create Product
                                </Link>
                            )}
                            <Link to="/profile" className="navbar__link navbar__link--profile" onClick={() => setIsMenuOpen(false)}>
                                {user.fullname || 'Profile'}
                            </Link>
                        </>
                    ) : (
                        <Link to="/login?redirect=/profile" className="navbar__login-btn" onClick={() => setIsMenuOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
