import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const TESTIMONIALS = [
    {
        id: 1,
        quote:
            '"Finally a brand that gets it — the fit, the fabric, the whole vibe. Snitch is the only label I reach for now."',
        name: 'Aryan M.',
        city: 'Mumbai',
        initials: 'AM',
    },
    {
        id: 2,
        quote:
            '"Ordered the Onyx Blazer and got a compliment within an hour of wearing it. Quality is genuinely premium."',
        name: 'Rahul S.',
        city: 'Bangalore',
        initials: 'RS',
    },
    {
        id: 3,
        quote:
            '"The attention to detail is unreal for this price point. Packaging, fabric, fit — all 10/10."',
        name: 'Karan P.',
        city: 'Delhi',
        initials: 'KP',
    },
];

const TestimonialsSection = () => {
    const sectionRef = useScrollReveal();

    return (
        <section
            id="testimonials"
            className="testimonials"
            aria-label="Customer Testimonials"
            ref={sectionRef}
        >
            <div className="testimonials__inner">
                <div className="section-header" style={{ textAlign: 'center' }}>
                    <p className="section-header__overline reveal">Community</p>
                    <h2 className="section-header__title reveal">What They're Saying</h2>
                </div>

                <div className="testimonials__grid">
                    {TESTIMONIALS.map((t) => (
                        <article key={t.id} className="testimonials__card reveal">
                            <div className="testimonials__stars" aria-label="5 stars">
                                ★★★★★
                            </div>
                            <blockquote className="testimonials__quote">
                                {t.quote}
                            </blockquote>
                            <div className="testimonials__author">
                                <div className="testimonials__avatar" aria-hidden="true">
                                    <span>{t.initials}</span>
                                </div>
                                <div className="testimonials__meta">
                                    <p className="testimonials__name">{t.name}</p>
                                    <p className="testimonials__city">{t.city}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
