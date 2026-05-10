import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const STORY_IMG =
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=85&auto=format&fit=crop';

const BrandStorySection = () => {
    const sectionRef = useScrollReveal();

    return (
        <section
            id="brand"
            className="brand-story"
            aria-label="Brand Story"
            ref={sectionRef}
        >
            <div className="brand-story__inner">
                {/* Left — editorial photo */}
                <div className="brand-story__media reveal">
                    <img
                        src={STORY_IMG}
                        alt="Snitch — built for the bold"
                        loading="lazy"
                    />
                </div>

                {/* Right — copy */}
                <div className="brand-story__text reveal">
                    <p className="brand-story__overline">Our Story</p>
                    <h2 className="brand-story__headline">
                        Built for <strong>the Bold</strong>
                    </h2>
                    <p className="brand-story__body">
                        Snitch is where raw creativity meets refined craftsmanship.
                        Designed for men who refuse to blend in — every piece is a
                        statement, every stitch a choice. We don't follow trends;
                        we set the pace.
                    </p>
                    <a href="/about" className="brand-story__link">
                        Discover our story
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BrandStorySection;
