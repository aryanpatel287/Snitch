import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import '../styles/_product-info.scss';

const ProductInfo = ({ product, selectedVariant, onVariantSelect }) => {
    const { title, price, description, variants = [] } = product;
    const [openSections, setOpenSections] = useState({
        details: true,
        reviews: false,
        delivery: false,
    });
    const [showSelectError, setShowSelectError] = useState(false);

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleVariantClick = (variant) => {
        setShowSelectError(false);
        if (selectedVariant && selectedVariant._id === variant._id) {
            onVariantSelect(null);
        } else {
            onVariantSelect(variant);
        }
    };

    const handleAddToBag = () => {
        if (variants.length > 0 && !selectedVariant) {
            setShowSelectError(true);
            return;
        }
        alert(`ADDED TO BAG: ${title} ${selectedVariant ? JSON.stringify(selectedVariant.attributes) : ''}`);
    };

    const activePrice = selectedVariant && selectedVariant.price ? selectedVariant.price : price;

    let buttonText = 'ADD TO BAG';
    let isButtonDisabled = false;

    if (variants.length > 0) {
        if (!selectedVariant) {
            buttonText = 'SELECT A SPECIFICATION';
        } else if (selectedVariant.stock === 0) {
            buttonText = 'OUT OF STOCK';
            isButtonDisabled = true;
        }
    }

    return (
        <div className="product-info">
            {/* Title & Price Row */}
            <div className="product-info__row">
                <h1 className="product-info__title">{title}</h1>
                <span className="product-info__price">
                    {activePrice?.currency === 'INR' ? '₹' : ''}
                    {activePrice?.amount}
                </span>
            </div>

            {/* Variant Selector Section */}
            {variants.length > 0 && (
                <div className={`product-info__variants ${showSelectError ? 'product-info__variants--error' : ''}`}>
                    <span className="product-info__variants-label">SELECT ARCHIVE SPECIFICATION</span>
                    <div className="product-info__variants-list">
                        {variants.map((v) => {
                            const isSelected = selectedVariant && selectedVariant._id === v._id;
                            const isOutOfStock = v.stock === 0;
                            const attributeLabel = Object.entries(v.attributes || {})
                                .map(([key, val]) => `${key.toUpperCase()}: ${val.toUpperCase()}`)
                                .join(' / ');

                            return (
                                <button
                                    key={v._id}
                                    type="button"
                                    onClick={() => handleVariantClick(v)}
                                    className={`variant-item-btn ${isSelected ? 'variant-item-btn--active' : ''} ${isOutOfStock ? 'variant-item-btn--out-of-stock' : ''}`}
                                >
                                    <span className="variant-item-btn__text">{attributeLabel}</span>
                                    {isOutOfStock && <span className="variant-item-btn__stock-status">(OUT OF STOCK)</span>}
                                </button>
                            );
                        })}
                    </div>
                    {showSelectError && (
                        <span className="product-info__variants-error-msg">PLEASE SELECT A SPECIFICATION TO PROCEED</span>
                    )}
                </div>
            )}

            {/* CTA Button */}
            <div className="product-info__actions">
                <button
                    type="button"
                    onClick={handleAddToBag}
                    disabled={isButtonDisabled}
                    className="button primary-button product-info__cta"
                >
                    {buttonText}
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
