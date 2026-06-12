import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import '../styles/_product-info.scss';

const ProductInfo = ({ product }) => {
    const { title, price, description } = product;
    const [openSections, setOpenSections] = useState({
        details: true,
        reviews: false,
        delivery: false,
    });

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div className="product-info">
            {/* Title & Price Row */}
            <div className="product-info__row">
                <h1 className="product-info__title">{title}</h1>
                <span className="product-info__price">
                    {price?.currency === 'INR' ? '₹' : ''}
                    {price?.amount}
                </span>
            </div>

            {/* CTA Button */}
            <div className="product-info__actions">
                <button type="button" className="button primary-button product-info__cta">
                    ADD TO BAG
                </button>
            </div>

            {/* Accordion Sections */}
            <div className="product-info__accordion">
                {/* Details Accordion */}
                <div className="accordion-item">
                    <button
                        type="button"
                        className="accordion-item__trigger"
                        onClick={() => toggleSection('details')}
                        aria-expanded={openSections.details}
                    >
                        <span>DETAILS</span>
                        {openSections.details ? <Minus size={14} /> : <Plus size={14} />}
                    </button>
                    <div className={`accordion-item__content-wrapper ${openSections.details ? 'accordion-item__content-wrapper--open' : ''}`}>
                        <div className="accordion-item__content">
                            <p>{description || 'No detailed specifications provided for this product.'}</p>
                        </div>
                    </div>
                </div>

                {/* Reviews Accordion */}
                <div className="accordion-item">
                    <button
                        type="button"
                        className="accordion-item__trigger"
                        onClick={() => toggleSection('reviews')}
                        aria-expanded={openSections.reviews}
                    >
                        <span>REVIEWS</span>
                        {openSections.reviews ? <Minus size={14} /> : <Plus size={14} />}
                    </button>
                    <div className={`accordion-item__content-wrapper ${openSections.reviews ? 'accordion-item__content-wrapper--open' : ''}`}>
                        <div className="accordion-item__content">
                            <p className="accordion-item__muted-text">
                                No reviews yet. Be the first to share your thoughts on this product!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Delivery Accordion */}
                <div className="accordion-item">
                    <button
                        type="button"
                        className="accordion-item__trigger"
                        onClick={() => toggleSection('delivery')}
                        aria-expanded={openSections.delivery}
                    >
                        <span>DELIVERY & RETURNS</span>
                        {openSections.delivery ? <Minus size={14} /> : <Plus size={14} />}
                    </button>
                    <div className={`accordion-item__content-wrapper ${openSections.delivery ? 'accordion-item__content-wrapper--open' : ''}`}>
                        <div className="accordion-item__content">
                            <p>
                                Enjoy free standard shipping on orders over ₹5,000. Under normal conditions, delivery takes 2–4 business days. Returns are accepted within 7 days from delivery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
