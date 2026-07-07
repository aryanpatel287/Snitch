import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <Link to="/" className="footer__wordmark">
                            SNITCH
                        </Link>
                        <p className="footer__tagline">
                            We have clothes that suits your style and which you're proud to wear. From women to men.
                        </p>
                        <div className="footer__socials">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <i className="ri-twitter-fill"></i>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <i className="ri-facebook-fill"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <i className="ri-instagram-fill"></i>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Github">
                                <i className="ri-github-fill"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div className="footer__nav">
                        <span className="footer__nav-title">Company</span>
                        <Link to="/products" className="footer__link">About</Link>
                        <Link to="/products" className="footer__link">Features</Link>
                        <Link to="/products" className="footer__link">Works</Link>
                        <Link to="/products" className="footer__link">Career</Link>
                    </div>
                    
                    <div className="footer__nav">
                        <span className="footer__nav-title">Help</span>
                        <Link to="/products" className="footer__link">Customer Support</Link>
                        <Link to="/products" className="footer__link">Delivery Details</Link>
                        <Link to="/products" className="footer__link">Terms & Conditions</Link>
                        <Link to="/products" className="footer__link">Privacy Policy</Link>
                    </div>
                    
                    <div className="footer__nav">
                        <span className="footer__nav-title">FAQ</span>
                        <Link to="/products" className="footer__link">Account</Link>
                        <Link to="/products" className="footer__link">Manage Deliveries</Link>
                        <Link to="/products" className="footer__link">Orders</Link>
                        <Link to="/products" className="footer__link">Payments</Link>
                    </div>

                    <div className="footer__nav">
                        <span className="footer__nav-title">Resources</span>
                        <Link to="/products" className="footer__link">Free eBook</Link>
                        <Link to="/products" className="footer__link">Development Tutorial</Link>
                        <Link to="/products" className="footer__link">How to - Blog</Link>
                        <Link to="/products" className="footer__link">Youtube Playlist</Link>
                    </div>
                </div>
                
                <div className="footer__bottom">
                    <span className="footer__copyright">
                        Snitch &copy; 2000-{new Date().getFullYear()}, All Rights Reserved.
                    </span>
                    <div className="footer__payment-gateways">
                        <span className="payment-badge"><i className="ri-visa-line"></i></span>
                        <span className="payment-badge"><i className="ri-mastercard-line"></i></span>
                        <span className="payment-badge"><i className="ri-paypal-line"></i></span>
                        <span className="payment-badge"><i className="ri-apple-fill"></i></span>
                        <span className="payment-badge"><i className="ri-google-fill"></i></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
