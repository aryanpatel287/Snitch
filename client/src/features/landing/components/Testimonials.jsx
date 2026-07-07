import React from 'react';

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: 'Sarah M.',
            verified: true,
            stars: 5,
            review: `"I'm blown away by the quality and style of these clothes. The attention to detail is outstanding, and the fit is absolutely perfect. Snitch is my new favorite fashion brand!"`
        },
        {
            id: 2,
            name: 'Alex K.',
            verified: true,
            stars: 5,
            review: `"Finding streetwear items that look great and feel comfortable is usually tough. The collections here are exactly what I wanted. Clean, loud, and premium fabric."`
        },
        {
            id: 3,
            name: 'James L.',
            verified: true,
            stars: 5,
            review: `"The shopping process was seamless and the delivery was fast. I ordered three t-shirts and they've already become my daily wardrobe pieces. Highly recommend!"`
        }
    ];

    return (
        <section className="testimonials-section">
            <div className="testimonials">
                <div className="testimonials__header">
                    <h2 className="testimonials__title">OUR HAPPY CUSTOMERS</h2>
                    <div className="testimonials__nav-arrows">
                        <button className="testimonials__arrow-btn" aria-label="Previous testimonials">
                            <i className="ri-arrow-left-line"></i>
                        </button>
                        <button className="testimonials__arrow-btn" aria-label="Next testimonials">
                            <i className="ri-arrow-right-line"></i>
                        </button>
                    </div>
                </div>
                
                <div className="testimonials__grid">
                    {reviews.map((r) => (
                        <div key={r.id} className="testimonial-card">
                            <div className="testimonial-card__stars">
                                {Array.from({ length: r.stars }).map((_, i) => (
                                    <i key={i} className="ri-star-fill testimonial-card__star"></i>
                                ))}
                            </div>
                            <div className="testimonial-card__author">
                                <span className="testimonial-card__name">{r.name}</span>
                                {r.verified && (
                                    <i className="ri-checkbox-circle-fill testimonial-card__verified"></i>
                                )}
                            </div>
                            <p className="testimonial-card__text">{r.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
