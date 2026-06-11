import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`SUBSCRIBED: ${email}`);
        setEmail('');
    };

    return (
        <section id="newsletter" className="newsletter">
            <div className="newsletter__header">
                <h2 className="newsletter__title">THE WEEKLY DISPATCH</h2>
                <p className="newsletter__text">
                    Join our roster for notifications on new composition drops, editorial campaigns, and limited garment releases.
                </p>
            </div>
            
            <form className="newsletter__form" onSubmit={handleSubmit}>
                <div className="newsletter__input-wrapper">
                    <input 
                        type="email" 
                        required
                        className="newsletter__input"
                        placeholder="Enter your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="button primary-button">
                    Subscribe
                </button>
            </form>
        </section>
    );
};

export default Newsletter;
