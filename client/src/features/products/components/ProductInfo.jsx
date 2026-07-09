import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { getMockProductMetaData } from './EditorialProductCard';
import '../styles/_product-info.scss';
import { useSelector } from 'react-redux';
import { useCart } from '../../cart/hooks/useCart';
import { useNavigate } from 'react-router';

const ProductInfo = ({ product, selectedVariant, onVariantSelect }) => {
    const { _id, title, price, description, variants = [] } = product;

    const cartErrorMsg = useSelector((state) => state.cart.error);
    const cartLoading = useSelector((state) => state.cart.loading);
    const user = useSelector((state) => state.auth.user);
    const userLoading = useSelector((state) => state.auth.loading);
    const { handleAddToCart } = useCart();

    const isAuthReady = !userLoading;
    const isUserLoggedIn = !!user;

    const navigate = useNavigate();

    // Helper function to safely read attribute values from Map/Object
    const getAttributeValue = (attributes, key) => {
        if (!attributes) return null;
        if (attributes instanceof Map) {
            return attributes.get(key) || attributes.get(key.charAt(0).toUpperCase() + key.slice(1));
        }
        if (typeof attributes.get === 'function') {
            return attributes.get(key) || attributes.get(key.charAt(0).toUpperCase() + key.slice(1));
        }
        const foundKey = Object.keys(attributes).find(
            (k) => k.toLowerCase() === key.toLowerCase()
        );
        return foundKey ? attributes[foundKey] : null;
    };

    // Dynamic extraction of unique attributes
    const groupedAttributes = {};
    variants.forEach((v) => {
        if (!v.attributes) return;

        let attributesObj = {};
        if (v.attributes instanceof Map) {
            attributesObj = Object.fromEntries(v.attributes);
        } else if (typeof v.attributes.toJSON === 'function') {
            attributesObj = v.attributes.toJSON();
        } else {
            attributesObj = v.attributes;
        }

        Object.entries(attributesObj).forEach(([key, val]) => {
            if (!val) return;
            const groupKey = key.toLowerCase();
            if (!groupedAttributes[groupKey]) {
                groupedAttributes[groupKey] = {
                    name: key, // original key capitalization
                    values: new Set()
                };
            }
            groupedAttributes[groupKey].values.add(val);
        });
    });

    const attributesList = Object.keys(groupedAttributes).map((groupKey) => ({
        key: groupKey,
        name: groupedAttributes[groupKey].name,
        values: Array.from(groupedAttributes[groupKey].values)
    }));

    // Active selections
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    const [validationError, setValidationError] = useState('');

    // Ratings & original price calculation
    const { rating, discountPercent } = getMockProductMetaData(product);

    // Find active variant matching all selected attributes
    useEffect(() => {
        if (variants.length === 0 || attributesList.length === 0) {
            onVariantSelect(null);
            return;
        }

        const allSelected = attributesList.every((attr) => !!selectedAttributes[attr.key]);

        if (allSelected) {
            const match = variants.find((v) => {
                return attributesList.every((attr) => {
                    const vVal = getAttributeValue(v.attributes, attr.key);
                    const selectedVal = selectedAttributes[attr.key];
                    return vVal?.toLowerCase() === selectedVal?.toLowerCase();
                });
            });
            onVariantSelect(match || null);
        } else {
            onVariantSelect(null);
        }
    }, [selectedAttributes, variants]);

    const handleAddToCartClick = async () => {
        if (!isAuthReady) {
            return;
        }

        if (!isUserLoggedIn) {
            navigate('/login');
            return;
        }

        if (variants.length > 0) {
            const unselected = attributesList.filter((attr) => !selectedAttributes[attr.key]);
            if (unselected.length > 0) {
                const names = unselected.map((attr) => attr.name.toLowerCase());
                if (names.length === 1) {
                    setValidationError(`Please select a ${names[0]}.`);
                } else {
                    const last = names.pop();
                    setValidationError(`Please select a ${names.join(', ')} and ${last}.`);
                }
                return;
            }
        }
        setValidationError('');

        await handleAddToCart({
            productId: _id,
            quantity,
            variantId: selectedVariant?._id || null,
        });
    };

    const colorHexes = {
        black: '#000000',
        white: '#ffffff',
        red: '#ff3333',
        blue: '#3357ff',
        green: '#33ff57',
        yellow: '#f3ff33',
        orange: '#ff9933',
        pink: '#ff3399',
        gray: '#808080',
        grey: '#808080',
        brown: '#a52a2a',
        navy: '#000080',
    };

    const getHex = (c) => {
        const key = c.toLowerCase();
        return colorHexes[key] || '#cccccc';
    };

    let activePrice;
    let originalPrice = null;
    let hasDiscount = false;

    if (selectedVariant) {
        activePrice = selectedVariant.price?.amount || 0;
    } else {
        originalPrice = price?.amount || 0;
        hasDiscount = discountPercent > 0;
        activePrice = hasDiscount
            ? Math.round(originalPrice * (1 - discountPercent / 100))
            : originalPrice;
    }

    return (
        <div className="product-info">
            <h1 className="product-info__title">{title}</h1>

            {/* Ratings row */}
            <div className="product-info__rating">
                <div className="product-info__stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <i
                            key={i}
                            className={`ri-star-fill ${i < Math.floor(rating) ? 'active' : ''}`}
                        ></i>
                    ))}
                    <span className="product-info__rating-val">{rating}/5</span>
                </div>
            </div>

            {/* Price display row */}
            <div className="product-info__price-row">
                <span className="product-info__price">₹{activePrice}</span>
                {hasDiscount && originalPrice > activePrice && (
                    <>
                        <span className="product-info__price-original">
                            ₹{originalPrice}
                        </span>
                        <span className="product-info__discount-badge">
                            -{discountPercent}%
                        </span>
                    </>
                )}
            </div>

            <p className="product-info__desc">{description}</p>

            <hr className="product-info__divider" />

            {/* Dynamic Variant Attributes */}
            {attributesList.map((attr) => {
                const isColor = attr.key === 'color';
                const isSize = attr.key === 'size';

                return (
                    <div key={attr.key} className="product-info__option-group">
                        <span className="product-info__option-label">
                            {isColor ? 'Select Color' : isSize ? 'Choose Size' : `Select ${attr.name}`}
                        </span>

                        {isColor ? (
                            <div className="product-info__colors">
                                {attr.values.map((c) => (
                                    <button
                                        key={c}
                                        className={`product-info__color-btn ${selectedAttributes.color === c ? 'active' : ''}`}
                                        style={{ backgroundColor: getHex(c) }}
                                        onClick={() => {
                                            setSelectedAttributes((prev) => ({
                                                ...prev,
                                                color: c,
                                            }));
                                            setValidationError('');
                                        }}
                                        title={c}
                                        aria-label={`Select color ${c}`}
                                    >
                                        {selectedAttributes.color === c && (
                                            <i
                                                className="ri-check-line"
                                                style={{
                                                    color:
                                                        c.toLowerCase() === 'white' ||
                                                        c.toLowerCase() === 'yellow'
                                                            ? '#000000'
                                                            : '#ffffff',
                                                }}
                                            ></i>
                                        )}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="product-info__sizes">
                                {attr.values.map((val) => (
                                    <button
                                        key={val}
                                        className={`product-info__size-btn ${selectedAttributes[attr.key] === val ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedAttributes((prev) => ({
                                                ...prev,
                                                [attr.key]: val,
                                            }));
                                            setValidationError('');
                                        }}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            <hr className="product-info__divider" />

            {/* Quantity Stepper & Add to Cart button */}
            <div className="product-info__action-row">
                <div className="product-info__stepper">
                    <button
                        className="product-info__stepper-btn"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                    >
                        <i className="ri-subtract-line"></i>
                    </button>
                    <span className="product-info__stepper-val">
                        {quantity}
                    </span>
                    <button
                        className="product-info__stepper-btn"
                        onClick={() => setQuantity((q) => q + 1)}
                        aria-label="Increase quantity"
                    >
                        <i className="ri-add-line"></i>
                    </button>
                </div>

                <button
                    className="button primary-button product-info__add-btn"
                    onClick={handleAddToCartClick}
                >
                    {cartLoading ? 'ADDING TO CART...' : 'ADD TO CART'}
                </button>
            </div>

            {(validationError || cartErrorMsg) && (
                <p className="product-info__error-msg">
                    {validationError || cartErrorMsg}
                </p>
            )}

            <hr className="product-info__divider" />

            {/* Tabs for Details / Reviews */}
            <div className="product-info__tabs">
                <div className="product-info__tabs-header">
                    <button
                        className={`product-info__tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                    >
                        Product Details
                    </button>
                    <button
                        className={`product-info__tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Rating & Reviews
                    </button>
                </div>

                <div className="product-info__tabs-content">
                    {activeTab === 'details' ? (
                        <div className="product-tab-details">
                            <p>
                                {description ||
                                    'No detailed specifications available.'}
                            </p>
                            <ul>
                                <li>Heavyweight Cotton Loopback fleece</li>
                                <li>
                                    Double-needle stitched shoulders, waist,
                                    cuffs
                                </li>
                                <li>Pre-shrunk for optimal streetwear fit</li>
                            </ul>
                        </div>
                    ) : (
                        <div className="product-tab-reviews">
                            <div className="product-review-item">
                                <div className="product-review-header">
                                    <strong>Samantha D.</strong>
                                    <span>Verified Purchase</span>
                                </div>
                                <p>
                                    "Absolutely love this fit! True to size and
                                    is incredibly heavy and warm. Highly
                                    recommend for the streetwear look."
                                </p>
                            </div>
                            <div className="product-review-item">
                                <div className="product-review-header">
                                    <strong>Liam M.</strong>
                                    <span>Verified Purchase</span>
                                </div>
                                <p>
                                    "Great quality fabric. Fits slightly
                                    oversized which is exactly what I wanted."
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
