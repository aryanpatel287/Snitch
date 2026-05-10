import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CollectionSection from '../components/CollectionSection';
import NewInSection from '../components/NewInSection';
import BrandStorySection from '../components/BrandStorySection';
import EditorialBanner from '../components/EditorialBanner';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import '../styles/landing.scss';

const LandingPage = () => (
    <>
        <Navbar />

        <main id="main-content">
            <Hero />
            <CollectionSection />
            <NewInSection />
            <BrandStorySection />
            <EditorialBanner />
            <TestimonialsSection />
            <NewsletterSection />
        </main>

        <Footer />
    </>
);

export default LandingPage;
