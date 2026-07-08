import React from 'react';
import { Link } from 'react-router';

const Hero = () => {
    return (
        <header 
            className="hero-section"
            style={{ backgroundImage: `url('https://ik.imagekit.io/ji8wynr3i/tr:w-1920,f-auto,q-80/snitch/landing/hero-banner-2.jpg')` }}
        >
            <div className="hero">
                <div className="hero__content">
                    <h1 className="hero__headline">
                        FIND CLOTHES <br />
                        THAT MATCHES <br />
                        YOUR STYLE
                    </h1>
                    
                    <p className="hero__lead">
                        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                    </p>
                    
                    <div className="hero__actions">
                        <Link to="/products" className="button primary-button hero__cta">
                            Shop Now
                        </Link>
                    </div>

                    <div className="hero-stats__grid">
                        <div className="hero-stats__col">
                            <span className="hero-stats__num">200+</span>
                            <span className="hero-stats__label">International Brands</span>
                        </div>
                        <div className="hero-stats__col">
                            <span className="hero-stats__num">2,000+</span>
                            <span className="hero-stats__label">High-Quality Products</span>
                        </div>
                        <div className="hero-stats__col">
                            <span className="hero-stats__num">30,000+</span>
                            <span className="hero-stats__label">Happy Customers</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
