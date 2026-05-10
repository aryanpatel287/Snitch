import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const BANNER_IMG = '/editorial_banner.png';


const EditorialBanner = () => {
    const sectionRef = useScrollReveal();

    return (
        <section
            id="editorial"
            className="editorial-banner"
            aria-label="Limited Edition Drop"
            ref={sectionRef}
        >
            {/* Full-bleed background */}
            <div className="editorial-banner__bg" aria-hidden="true">
                <img
                    src={BANNER_IMG}
                    alt="Limited edition editorial campaign"
                    loading="lazy"
                />
            </div>

            {/* Centred overlay text */}
            <div className="editorial-banner__content reveal">
                <p className="editorial-banner__tag">Limited Edition</p>
                <h2 className="editorial-banner__headline">
                    Limited Edition Drop
                </h2>
                <p className="editorial-banner__sub">
                    Only 100 Pieces. Exclusively Yours.
                </p>
                <a href="/drop" className="btn-land btn-land--ghost-light">
                    Shop the Drop
                </a>
            </div>
        </section>
    );
};

export default EditorialBanner;
