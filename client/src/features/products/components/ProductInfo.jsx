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

    // Extracted Unique options
    const colors = Array.from(
        new Set(
            variants
                .map((v) => {
                    if (!v.attributes) return null;
                    return (
                        v.attributes.color ||
                        v.attributes.Color ||
                        (typeof v.attributes.get === 'function'
                            ? v.attributes.get('color')
                            : null)
                    );
                })
                .filter(Boolean),
        ),
    );

    const sizes = Array.from(
        new Set(
            variants
                .map((v) => {
                    if (!v.attributes) return null;
                    return (
                        v.attributes.size ||
                        v.attributes.Size ||
                        (typeof v.attributes.get === 'function'
                            ? v.attributes.get('size')
                            : null)
                    );
                })
                .filter(Boolean),
        ),
    );

    // Active selections
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    const [validationError, setValidationError] = useState('');

    // Ratings & original price calculation
    const { rating, discountPercent } = getMockProductMetaData(product);

    // Find active variant matching selected color & size
    useEffect(() => {
        const hasColors = colors.length > 0;
        const hasSizes = sizes.length > 0;
        const isColorSelected = !hasColors || !!selectedColor;
        const isSizeSelected = !hasSizes || !!selectedSize;

        if (
            variants.length > 0 &&
            isColorSelected &&
            isSizeSelected &&
            (selectedColor || selectedSize)
        ) {
            const match = variants.find((v) => {
                const cVal =
                    v.attributes.color ||
                    v.attributes.Color ||
                    (typeof v.attributes.get === 'function'
                        ? v.attributes.get('color')
                        : null);
                const sVal =
                    v.attributes.size ||
                    v.attributes.Size ||
                    (typeof v.attributes.get === 'function'
                        ? v.attributes.get('size')
                        : null);
                const colorMatches =
                    !hasColors ||
                    cVal?.toLowerCase() === selectedColor?.toLowerCase();
                const sizeMatches =
                    !hasSizes ||
                    sVal?.toLowerCase() === selectedSize?.toLowerCase();
                return colorMatches && sizeMatches;
            });
            onVariantSelect(match || null);
        } else {
            onVariantSelect(null);
        }
    }, [selectedColor, selectedSize, variants, colors, sizes]);

    const handleColorSelect = (c) => {
        setSelectedColor(c);
        setValidationError('');
    };

    const handleSizeSelect = (s) => {
        setSelectedSize(s);
        setValidationError('');
    };

    const handleAddToCartClick = async () => {
        if (!isAuthReady) {
            return;
        }

        if (!isUserLoggedIn) {
            navigate('/login');
            return;
        }

        if (variants.length > 0) {
            const hasColors = colors.length > 0;
            const hasSizes = sizes.length > 0;
            if (hasColors && !selectedColor && hasSizes && !selectedSize) {
                setValidationError('Please select a color and a size.');
                return;
            }
            if (hasColors && !selectedColor) {
                setValidationError('Please select a color.');
                return;
            }
            if (hasSizes && !selectedSize) {
                setValidationError('Please select a size.');
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

            {/* Color Swatches */}
            {colors.length > 0 && (
                <div className="product-info__option-group">
                    <span className="product-info__option-label">
                        Select Color
                    </span>
                    <div className="product-info__colors">
                        {colors.map((c) => (
                            <button
                                key={c}
                                className={`product-info__color-btn ${selectedColor === c ? 'active' : ''}`}
                                style={{ backgroundColor: getHex(c) }}
                                onClick={() => handleColorSelect(c)}
                                title={c}
                                aria-label={`Select color ${c}`}
                            >
                                {selectedColor === c && (
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
                </div>
            )}

            {/* Size selector pills */}
            {sizes.length > 0 && (
                <div className="product-info__option-group">
                    <span className="product-info__option-label">
                        Choose Size
                    </span>
                    <div className="product-info__sizes">
                        {sizes.map((s) => (
                            <button
                                key={s}
                                className={`product-info__size-btn ${selectedSize === s ? 'active' : ''}`}
                                onClick={() => handleSizeSelect(s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

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
