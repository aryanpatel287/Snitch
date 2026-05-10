import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const NewsletterSection = () => {
    const sectionRef = useScrollReveal();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        // Placeholder — wire to API when backend newsletter endpoint exists
        setSubmitted(true);
    };

    return (
        <section
            id="newsletter"
            className="newsletter"
            aria-label="Newsletter Signup"
            ref={sectionRef}
        >
            <div className="newsletter__inner">
                <p className="newsletter__overline reveal">Inner Circle</p>
                <h2 className="newsletter__headline reveal">Join the Inner Circle</h2>
                <p className="newsletter__sub reveal">
                    Early access. Exclusive drops. No noise.
                </p>

                {submitted ? (
                    <p
                        className="newsletter__sub reveal is-visible"
                        style={{ color: 'var(--color-onyx)', fontWeight: 600 }}
                    >
                        You're in. Welcome to the circle.
                    </p>
                ) : (
                    <form
                        className="newsletter__form reveal"
                        onSubmit={handleSubmit}
                        aria-label="Newsletter subscription form"
                    >
                        <input
                            id="newsletter-email"
                            className="newsletter__input"
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email address"
                            autoComplete="email"
                        />
                        <button
                            type="submit"
                            className="btn-land btn-land--primary"
                            style={{ borderRadius: 0 }}
                        >
                            Subscribe
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default NewsletterSection;
