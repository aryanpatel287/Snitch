import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
            <div className="navbar__inner">
                {/* Left nav */}
                <nav className="navbar__nav" aria-label="Primary navigation">
                    <a href="#collection">Collections</a>
                    <a href="#new-in">New Arrivals</a>
                    <a href="#editorial">Editorial</a>
                </nav>

                {/* Centred wordmark */}
                <a href="/" className="navbar__wordmark" aria-label="Snitch home">
                    Snitch
                </a>

                {/* Right actions */}
                <div className="navbar__actions">
                    <button className="navbar__action-btn" aria-label="Search">
                        Search
                    </button>
                    <a href="/bag" className="navbar__action-btn" aria-label="Shopping bag">
                        Bag&nbsp;(0)
                    </a>
                    <button
                        className="navbar__hamburger"
                        aria-label="Open menu"
                        aria-expanded="false"
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
