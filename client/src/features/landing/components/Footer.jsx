import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="footer texture-lines--inverted">
            <div className="footer__container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <Link to="/" className="footer__wordmark">
                            SNITCH
                        </Link>
                        <p className="footer__tagline">
                            An architectural storefront for luxury monochrome clothing. Strictly black and white.
                        </p>
                    </div>
                    
                    <div className="footer__nav">
                        <span className="footer__nav-title">Shop</span>
                        <a href="#collections" className="footer__link">Collections</a>
                        <a href="#collections" className="footer__link">New Arrivals</a>
                        <a href="#collections" className="footer__link">Outerwear</a>
                    </div>
                    
                    <div className="footer__nav">
                        <span className="footer__nav-title">Company</span>
                        <a href="#story" className="footer__link">Our Story</a>
                        <a href="#editorial" className="footer__link">Campaigns</a>
                        <a href="#editorial" className="footer__link">Sustainability</a>
                    </div>
                    
                    <div className="footer__nav">
                        <span className="footer__nav-title">Support</span>
                        <a href="#newsletter" className="footer__link">Dispatch</a>
                        <Link to="/login" className="footer__link">Client Account</Link>
                        <Link to="/register" className="footer__link">Register</Link>
                    </div>
                </div>
                
                <div className="footer__bottom">
                    <span className="footer__copyright">
                        &copy; {new Date().getFullYear()} SNITCH CO. ALL RIGHTS RESERVED.
                    </span>
                    <div className="footer__socials">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">Twitter</a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">Pinterest</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
