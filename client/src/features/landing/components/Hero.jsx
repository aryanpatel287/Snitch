import React from 'react';

const Hero = () => {
    return (
        <header className="hero-section">
            <div className="hero">
                <div className="hero__content">
                    <h1 className="hero__headline">
                        THE ART OF <br />
                        <em>REDUCTION</em>
                    </h1>
                    
                    <div className="hero__indicator">
                        <hr className="editorial-divider" />
                        <div className="hero__rule-marker" />
                    </div>

                    <p className="hero__lead">
                        A study in monochrome luxury. Austere silhouettes, structured geometry, and strict monochrome palettes designed for the uncompromising editor.
                    </p>
                    <div className="hero__actions">
                        <a href="#collections" className="button primary-button">
                            Explore Collection
                        </a>
                        <a href="#collections" className="button secondary-button">
                            New Arrivals
                        </a>
                    </div>
                </div>
                <div className="hero__image-wrapper">
                    <img 
                        src="/hero_model.png" 
                        alt="Editorial model in stark monochrome clothing" 
                        className="hero__image"
                    />
                </div>
            </div>

            {/* Statistics Banner - Inverted Grid (Black) with vertical borders and + markers */}
            <div className="hero-stats texture-noise--inverted">
                <div className="hero-stats__container">
                    <div className="hero-stats__col">
                        <span className="hero-stats__num">500k+</span>
                        <span className="hero-stats__label">Active Users</span>
                    </div>
                    <div className="hero-stats__col">
                        <div className="plus-marker plus-marker--top">+</div>
                        <div className="plus-marker plus-marker--bottom">+</div>
                        <span className="hero-stats__num">99.99%</span>
                        <span className="hero-stats__label">Uptime SLA</span>
                    </div>
                    <div className="hero-stats__col">
                        <div className="plus-marker plus-marker--top">+</div>
                        <div className="plus-marker plus-marker--bottom">+</div>
                        <span className="hero-stats__num">24/7</span>
                        <span className="hero-stats__label">Support Access</span>
                    </div>
                    <div className="hero-stats__col">
                        <div className="plus-marker plus-marker--top">+</div>
                        <div className="plus-marker plus-marker--bottom">+</div>
                        <span className="hero-stats__num">$10M+</span>
                        <span className="hero-stats__label">Customer Savings</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
