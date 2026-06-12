import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import LogoutButton from '../../auth/components/LogoutButton';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const closeAllMenus = () => {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isMenuOpen) {
            setIsDropdownOpen(false);
        }
    };

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar__profile-dropdown')) {
                setIsDropdownOpen(false);
            }
        };
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isMenuOpen ? 'navbar--open' : ''}`}>
            <div className="navbar__container">
                <Link to="/" className="navbar__wordmark" onClick={closeAllMenus}>
                    SNITCH
                </Link>
                
                <div className="navbar__mobile-actions">
                    <Link 
                        to={user ? "/profile" : "/login?redirect=/profile"} 
                        className="navbar__profile-mobile"
                        onClick={closeAllMenus}
                        aria-label="User Profile"
                    >
                        <i className="ri-user-line"></i>
                    </Link>
                    <button 
                        className="navbar__toggle" 
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMenuOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-line"></i>}
                    </button>
                </div>

                <div className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}>
                    <Link to="/products" className="navbar__link" onClick={closeAllMenus}>Shop</Link>
                    <a href="/#story" className="navbar__link" onClick={closeAllMenus}>Story</a>

                    {user ? (
                        <>
                            {user.role === 'seller' && (
                                <Link to="/profile?tab=add-product" className="navbar__link" onClick={closeAllMenus}>
                                    Create Product
                                </Link>
                            )}
                            <div className="navbar__profile-dropdown">
                                <button 
                                    className="navbar__link navbar__link--dropdown-trigger"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    aria-expanded={isDropdownOpen}
                                >
                                    {user.fullname || 'Profile'}
                                    <i className={`ri-arrow-down-s-line navbar__dropdown-arrow ${isDropdownOpen ? 'navbar__dropdown-arrow--open' : ''}`}></i>
                                </button>
                                {isDropdownOpen && (
                                    <div className="navbar__dropdown-menu">
                                        <Link 
                                            to="/profile" 
                                            className="navbar__dropdown-item" 
                                            onClick={closeAllMenus}
                                        >
                                            Profile
                                        </Link>
                                        <LogoutButton 
                                            className="navbar__dropdown-item navbar__dropdown-item--logout"
                                            onClick={closeAllMenus}
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link to="/login?redirect=/profile" className="navbar__login-btn" onClick={closeAllMenus}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
