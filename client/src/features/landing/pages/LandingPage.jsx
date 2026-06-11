import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Collection from '../components/Collection';
import BrandStory from '../components/BrandStory';
import EditorialBanner from '../components/EditorialBanner';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="landing-page texture-lines texture-grid">
            {/* Accessibility Skip Link */}
            <a href="#main-content" className="button primary-button" style={{
                position: 'absolute',
                top: '-100px',
                left: '20px',
                zIndex: 1000,
                transition: 'top var(--transition-fast) ease',
            }}
            onFocus={(e) => {
                e.target.style.top = '20px';
            }}
            onBlur={(e) => {
                e.target.style.top = '-100px';
            }}
            >
                Skip to main content
            </a>

            <Navbar />
            
            <main id="main-content">
                <Hero />
                <hr className="editorial-divider editorial-divider--thick" />
                <Collection />
                <hr className="editorial-divider" />
                <BrandStory />
                <hr className="editorial-divider editorial-divider--thick" />
                <EditorialBanner />
                <hr className="editorial-divider" />
                <Testimonials />
                <Newsletter />
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
