import React, { useEffect, useRef } from 'react';

const Hero = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        if (!contentRef.current) return;
        const els = contentRef.current.querySelectorAll('.reveal');
        requestAnimationFrame(() => {
            els.forEach((el) => el.classList.add('is-visible'));
        });
    }, []);

    return (
        <section className="hero" aria-label="Hero — Spring Summer 2025" ref={contentRef}>
            {/* Left — text content */}
            <div className="hero__content">
                <p className="hero__overline reveal">Spring / Summer 2025</p>

                <h1 className="hero__headline reveal">
                    Dressed for the <em>ones who dare</em>
                </h1>

                <p className="hero__sub reveal">
                    New season. Unapologetic style.
                </p>

                <div className="hero__ctas reveal">
                    <a href="#collection" className="btn-land btn-land--primary">
                        Shop Now
                    </a>
                    <a href="#editorial" className="btn-land btn-land--ghost">
                        Explore Lookbook
                    </a>
                </div>

                <span className="hero__scroll-hint reveal" aria-hidden="true">
                    Scroll to Explore
                </span>
            </div>

            {/* Right — editorial portrait image */}
            <div className="hero__media" aria-hidden="true">
                <img
                    src="/hero_model.png"
                    alt="Editorial menswear — Spring Summer 2025"
                    loading="eager"
                    fetchpriority="high"
                />
            </div>
        </section>
    );
};

export default Hero;
