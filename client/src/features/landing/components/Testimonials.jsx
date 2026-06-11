import React from 'react';

const Testimonials = () => {
    const quotes = [
        {
            id: 1,
            quote: '“Snitch rejects the temporary. Their pieces do not ask to be noticed; they command attention through silence.”',
            author: 'VOGUE EDITORIAL, ISSUE 842'
        },
        {
            id: 2,
            quote: '“By stripping color and curves, they have created a timeless design language that is both severe and luxurious.”',
            author: 'THE NEW YORK ARCHIVE'
        }
    ];

    return (
        <section className="testimonials">
            <div className="testimonials__header">
                <div className="section-header-line">
                    <span className="section-header-line__label">02 / Press</span>
                    <span className="section-header-line__rule"></span>
                </div>
                <h2 className="testimonials__title">EDITORIAL VERDICTS</h2>
            </div>
            
            <div className="testimonials__quote-container">
                {quotes.map((item) => (
                    <blockquote key={item.id} className="testimonials__card">
                        <span className="testimonials__mark">“</span>
                        <div className="testimonials__quote-wrapper">
                            <p className="testimonials__quote">{item.quote}</p>
                            <cite className="testimonials__author">{item.author}</cite>
                        </div>
                    </blockquote>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
