import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import LogoutButton from '../../auth/components/LogoutButton';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const navigate = useNavigate();

    const [cartCount, setCartCount] = useState(0);

    const syncCartCount = () => {
        try {
            const items = useSelector((state) => state.cart.items);
            const count = items.reduce((acc, curr) => acc + curr.quantity, 0);
            setCartCount(count);
        } catch (e) {
            setCartCount(0);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        syncCartCount();
        window.addEventListener('storage', syncCartCount);
        window.addEventListener('cart-updated', syncCartCount);
        return () => {
            window.removeEventListener('storage', syncCartCount);
            window.removeEventListener('cart-updated', syncCartCount);
        };
    }, []);

    const closeAllMenus = () => {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchVal.trim()) {
            navigate(
                `/products?search=${encodeURIComponent(searchVal.trim())}`,
            );
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <Link
                    to="/"
                    className="navbar__wordmark"
                    onClick={closeAllMenus}
                >
                    SNITCH
                </Link>

                <div
                    className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}
                >
                    <Link
                        to="/products"
                        className="navbar__link"
                        onClick={closeAllMenus}
                    >
                        Shop
                    </Link>
                    <a
                        href="/#story"
                        className="navbar__link"
                        onClick={closeAllMenus}
                    >
                        Story
                    </a>
                    {user && user.role === 'seller' && (
                        <Link
                            to="/profile?tab=my-products"
                            className="navbar__link"
                            onClick={closeAllMenus}
                        >
                            My Products
                        </Link>
                    )}
                </div>

                <form
                    className="navbar__search-form"
                    onSubmit={handleSearchSubmit}
                >
                    <i className="ri-search-line navbar__search-icon"></i>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="navbar__search-input"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                    />
                </form>

                <div className="navbar__actions-group">
                    <Link
                        to="/cart"
                        className="navbar__icon-btn"
                        aria-label="Shopping Cart"
                    >
                        <i className="ri-shopping-cart-2-line"></i>
                        {cartCount > 0 && (
                            <span className="navbar__cart-badge">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="navbar__profile-dropdown">
                            <button
                                className="navbar__link navbar__link--dropdown-trigger"
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                aria-expanded={isDropdownOpen}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                {user.fullname}
                                <i className="ri-arrow-down-s-line"></i>
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
                    ) : (
                        <Link
                            to="/login?redirect=/profile"
                            className="navbar__login-btn"
                            onClick={closeAllMenus}
                            style={{ textDecoration: 'none' }}
                        >
                            Login
                        </Link>
                    )}

                    <button
                        className="navbar__toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <i className="ri-close-line"></i>
                        ) : (
                            <i className="ri-menu-line"></i>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
