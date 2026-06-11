import React from 'react';

const EditorialBanner = () => {
    return (
        <section id="editorial" className="editorial-banner texture-noise--inverted">
            <div className="editorial-banner__container">
                <div className="editorial-banner__wrapper">
                    <div className="editorial-banner__content">
                        <h2 className="editorial-banner__title">
                            THE <em>MONOLITH</em> <br />
                            COLLECTION
                        </h2>
                        <p className="editorial-banner__text">
                            A limited release of structural knitwear and outerwear designed to weather any season. Engineered from heavyweight raw materials and finished with double-needle raw edges.
                        </p>
                        <a href="#collections" className="button secondary-button" style={{ borderColor: '#ffffff', color: '#ffffff' }}>
                            View The Lookbook
                        </a>
                    </div>
                    <div className="editorial-banner__media">
                        <img 
                            src="/editorial_banner.png" 
                            alt="Monolith editorial knitwear close-up" 
                            className="editorial-banner__img"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditorialBanner;
