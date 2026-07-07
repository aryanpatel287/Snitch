import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`SUBSCRIBED: ${email}`);
        setEmail('');
    };

    return (
        <section id="newsletter" className="newsletter-section">
            <div className="newsletter-card">
                <div className="newsletter-card__left">
                    <h2 className="newsletter-card__title">
                        STAY UPTO DATE ABOUT OUR LATEST OFFERS
                    </h2>
                </div>
                
                <form className="newsletter-card__form" onSubmit={handleSubmit}>
                    <div className="newsletter-card__input-wrapper">
                        <i className="ri-mail-line newsletter-card__input-icon"></i>
                        <input 
                            type="email" 
                            required
                            className="newsletter-card__input"
                            placeholder="Enter your email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button secondary-button newsletter-card__submit">
                        Subscribe to Newsletter
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
