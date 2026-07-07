import React from 'react';
import { Link } from 'react-router';
import '../styles/_editorial-product-card.scss';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23666">NO IMAGE</text></svg>';

// Deterministic rating and discount helper based on product title or id
export const getMockProductMetaData = (product) => {
    const key = product._id || product.title || '';
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    const ratingVal = ((hash % 11) / 10) + 4.0; // 4.0 - 5.0 rating
    const rating = ratingVal.toFixed(1);
    const hasDiscount = hash % 3 === 0;
    const discountPercent = hasDiscount ? (hash % 4 === 0 ? 30 : 20) : 0;
    
    return { rating, discountPercent };
};

export const EditorialProductCard = ({ product, showMetadata = true, onClick, to }) => {
    const imageUrl = product.images?.[0]?.url || PLACEHOLDER_IMAGE;
    const imageAlt = product.images?.[0]?.alt || product.title;
    
    const { rating, discountPercent } = getMockProductMetaData(product);
    const originalPrice = product.price?.amount;
    const hasDiscount = discountPercent > 0;
    const activePrice = hasDiscount
        ? Math.round(originalPrice * (1 - discountPercent / 100))
        : originalPrice;

    const CardComponent = to ? Link : 'div';
    const cardProps = to
        ? { to, className: 'editorial-product-card' }
        : {
              className: 'editorial-product-card',
              onClick,
              style: { cursor: onClick ? 'pointer' : 'default' },
          };

    // Helper to render stars
    const renderStars = (score) => {
        const stars = [];
        const fullStars = Math.floor(score);
        const hasHalf = score - fullStars >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<i key={i} className="ri-star-fill rating-star-icon"></i>);
            } else if (i === fullStars + 1 && hasHalf) {
                stars.push(<i key={i} className="ri-star-half-fill rating-star-icon"></i>);
            } else {
                stars.push(<i key={i} className="ri-star-line rating-star-icon"></i>);
            }
        }
        return stars;
    };

    return (
        <CardComponent {...cardProps}>
            <div className="product-card__image-container">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className={`product-card__image ${imageUrl === PLACEHOLDER_IMAGE ? 'product-card__image--placeholder' : ''}`}
                />
            </div>
            <div className="product-card__details">
                <h3 className="product-card__title">{product.title}</h3>
                
                {/* Rating Stars & Value */}
                <div className="product-card__rating">
                    <div className="product-card__stars">{renderStars(parseFloat(rating))}</div>
                    <span className="product-card__rating-val">{rating}/5</span>
                </div>

                {/* Price Display */}
                <div className="product-card__price-row">
                    <span className="product-card__price">
                        {product.price?.currency === 'INR' ? '₹' : '$'}
                        {activePrice}
                    </span>
                    {hasDiscount && (
                        <>
                            <span className="product-card__price-original">
                                {product.price?.currency === 'INR' ? '₹' : '$'}
                                {originalPrice}
                            </span>
                            <span className="product-card__discount-badge">
                                -{discountPercent}%
                            </span>
                        </>
                    )}
                </div>
            </div>
        </CardComponent>
    );
};

export default EditorialProductCard;
