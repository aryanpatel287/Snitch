import React from 'react';
import { Link } from 'react-router';

const Hero = () => {
    return (
        <header className="hero-section">
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
                
                <div className="hero__image-wrapper">
                    <img 
                        src="/hero_model.png" 
                        alt="Streetwear styles" 
                        className="hero__image"
                    />
                    <div className="hero__sparkle hero__sparkle--large">
                        <i className="ri-sparkling-fill"></i>
                    </div>
                    <div className="hero__sparkle hero__sparkle--small">
                        <i className="ri-sparkling-fill"></i>
                    </div>
                </div>
            </div>

            <div className="hero-sponsors">
                <div className="hero-sponsors__container">
                    <span className="sponsor-logo">VERSACE</span>
                    <span className="sponsor-logo">ZARA</span>
                    <span className="sponsor-logo">GUCCI</span>
                    <span className="sponsor-logo">PRADA</span>
                    <span className="sponsor-logo">Calvin Klein</span>
                </div>
            </div>
        </header>
    );
};

export default Hero;
