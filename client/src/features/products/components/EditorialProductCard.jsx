import React from 'react';
import { Link } from 'react-router';
import '../styles/_editorial-product-card.scss';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23f5f5f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="12" fill="%23000">NO IMAGE</text></svg>';

export const EditorialProductCard = ({ product, showMetadata = true, onClick, to }) => {
    const imageUrl = product.images?.[0]?.url || PLACEHOLDER_IMAGE;
    const imageAlt = product.images?.[0]?.alt || product.title;

    const CardComponent = to ? Link : 'div';
    const cardProps = to
        ? { to, className: 'editorial-product-card' }
        : {
              className: 'editorial-product-card',
              onClick,
              style: { cursor: onClick ? 'pointer' : 'default' },
          };

    return (
        <CardComponent {...cardProps}>
            <div className="product-card__image-container">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="product-card__image"
                />
            </div>
            <div className="product-card__details">
                <div className="product-card__header">
                    <h3 className="product-card__title">{product.title}</h3>
                    <span className="product-card__price">
                        {product.price?.currency === 'INR' ? '₹' : ''}
                        {product.price?.amount}
                    </span>
                </div>
                {showMetadata && (
                    <div className="product-card__metadata">
                        <span>Added: {new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                )}
            </div>
        </CardComponent>
    );
};

export default EditorialProductCard;
