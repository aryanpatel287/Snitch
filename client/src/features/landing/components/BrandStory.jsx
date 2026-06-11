import React from 'react';

const BrandStory = () => {
    return (
        <section id="story" className="brand-story">
            <div className="brand-story__content">
                <h2 className="brand-story__headline">
                    THE ARCHITECTURE <br />
                    OF <em>SILHOUETTE</em>
                </h2>
                <div className="brand-story__body">
                    <span className="brand-story__dropcap">S</span>
                    nitch was born out of a desire to create a luxury brand campaign space. We build garments that serve as architectural blocks for your wardrobe. With zero decoration, strict geometry, and uncompromising dedication to monochrome tones, each piece allows you to declare presence without noise.
                </div>
                <div className="brand-story__body">
                    We believe in reduction. When you remove color, you highlight form, texture, and light. When you remove rounded softness, you introduce authority and precision.
                </div>
            </div>
            <div className="brand-story__image-wrapper">
                <img 
                    src="/hero_model.png" 
                    alt="Textured fabric silhouette" 
                    className="brand-story__image" 
                    style={{ aspectRatio: '4/5', objectFit: 'cover' }}
                />
            </div>
        </section>
    );
};

export default BrandStory;
