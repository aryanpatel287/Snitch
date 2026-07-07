import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { getMockProductMetaData } from './EditorialProductCard';
import '../styles/_product-info.scss';

const ProductInfo = ({ product, selectedVariant, onVariantSelect }) => {
    const { _id, title, price, description, variants = [] } = product;

    // Extracted Unique options
    const colors = Array.from(new Set(variants.map(v => {
        if (!v.attributes) return null;
        return v.attributes.color || v.attributes.Color || (typeof v.attributes.get === 'function' ? v.attributes.get('color') : null);
    }).filter(Boolean)));

    const sizes = Array.from(new Set(variants.map(v => {
        if (!v.attributes) return null;
        return v.attributes.size || v.attributes.Size || (typeof v.attributes.get === 'function' ? v.attributes.get('size') : null);
    }).filter(Boolean)));

    // Active selections
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    const [errorMsg, setErrorMsg] = useState('');

    // Ratings & original price calculation
    const { rating, originalPrice, discountPercent } = getMockProductMetaData(_id, title, price?.amount || 0);

    // Auto-select first color/size if available
    useEffect(() => {
        if (colors.length > 0 && !selectedColor) {
            setSelectedColor(colors[0]);
        }
        if (sizes.length > 0 && !selectedSize) {
            setSelectedSize(sizes[0]);
        }
    }, [colors, sizes]);

    // Find active variant matching selected color & size
    useEffect(() => {
        if (variants.length > 0 && selectedColor && selectedSize) {
            const match = variants.find(v => {
                const cVal = v.attributes.color || v.attributes.Color || (typeof v.attributes.get === 'function' ? v.attributes.get('color') : null);
                const sVal = v.attributes.size || v.attributes.Size || (typeof v.attributes.get === 'function' ? v.attributes.get('size') : null);
                return cVal === selectedColor && sVal === selectedSize;
            });
            onVariantSelect(match || null);
        }
    }, [selectedColor, selectedSize, variants]);

    const handleAddToBag = () => {
        if (variants.length > 0 && (!selectedColor || !selectedSize)) {
            setErrorMsg('Please choose both a color and a size.');
            return;
        }

        setErrorMsg('');

        // Construct Cart item
        const activePrice = selectedVariant && selectedVariant.price ? selectedVariant.price.amount : price.amount;
        const itemImage = selectedVariant && selectedVariant.images && selectedVariant.images.length > 0 
            ? selectedVariant.images[0].url 
            : (product.images && product.images.length > 0 ? product.images[0].url : '/linen_overshirt.png');

        const cartItem = {
            id: `${_id}-${selectedColor}-${selectedSize}`,
            productId: _id,
            title: title,
            image: itemImage,
            price: activePrice,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity
        };

        // Load existing cart
        const cart = JSON.parse(localStorage.getItem('snitch_cart') || '[]');
        const existingIdx = cart.findIndex(item => item.id === cartItem.id);
        
        if (existingIdx > -1) {
            cart[existingIdx].quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('snitch_cart', JSON.stringify(cart));
        
        // Dispatch event for Navbar sync
        window.dispatchEvent(new Event('cart-updated'));
        alert(`ADDED TO CART: ${title} (${selectedSize} / ${selectedColor}) x ${quantity}`);
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
        navy: '#000080'
    };

    const getHex = (c) => {
        const key = c.toLowerCase();
        return colorHexes[key] || '#cccccc';
    };

    const activePrice = selectedVariant && selectedVariant.price ? selectedVariant.price.amount : price.amount;

    return (
        <div className="product-info">
            <h1 className="product-info__title">{title}</h1>

            {/* Ratings row */}
            <div className="product-info__rating">
                <div className="product-info__stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className={`ri-star-fill ${i < Math.floor(rating) ? 'active' : ''}`}></i>
                    ))}
                    <span className="product-info__rating-val">{rating}/5</span>
                </div>
            </div>

            {/* Price display row */}
            <div className="product-info__price-row">
                <span className="product-info__price">${activePrice}</span>
                {originalPrice > activePrice && (
                    <>
                        <span className="product-info__price-original">${originalPrice}</span>
                        <span className="product-info__discount-badge">-{discountPercent}%</span>
                    </>
                )}
            </div>

            <p className="product-info__desc">{description}</p>

            <hr className="product-info__divider" />

            {/* Color Swatches */}
            {colors.length > 0 && (
                <div className="product-info__option-group">
                    <span className="product-info__option-label">Select Color</span>
                    <div className="product-info__colors">
                        {colors.map((c) => (
                            <button
                                key={c}
                                className={`product-info__color-btn ${selectedColor === c ? 'active' : ''}`}
                                style={{ backgroundColor: getHex(c) }}
                                onClick={() => setSelectedColor(c)}
                                title={c}
                                aria-label={`Select color ${c}`}
                            >
                                {selectedColor === c && (
                                    <i className="ri-check-line" style={{ color: c.toLowerCase() === 'white' || c.toLowerCase() === 'yellow' ? '#000000' : '#ffffff' }}></i>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Size selector pills */}
            {sizes.length > 0 && (
                <div className="product-info__option-group">
                    <span className="product-info__option-label">Choose Size</span>
                    <div className="product-info__sizes">
                        {sizes.map((s) => (
                            <button
                                key={s}
                                className={`product-info__size-btn ${selectedSize === s ? 'active' : ''}`}
                                onClick={() => setSelectedSize(s)}
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
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                    >
                        <i className="ri-subtract-line"></i>
                    </button>
                    <span className="product-info__stepper-val">{quantity}</span>
                    <button 
                        className="product-info__stepper-btn" 
                        onClick={() => setQuantity(q => q + 1)}
                        aria-label="Increase quantity"
                    >
                        <i className="ri-add-line"></i>
                    </button>
                </div>

                <button 
                    className="button primary-button product-info__add-btn"
                    onClick={handleAddToBag}
                >
                    Add to Cart
                </button>
            </div>

            {errorMsg && <p className="product-info__error-msg">{errorMsg}</p>}

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
                            <p>{description || 'No detailed specifications available.'}</p>
                            <ul>
                                <li>Heavyweight Cotton Loopback fleece</li>
                                <li>Double-needle stitched shoulders, waist, cuffs</li>
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
                                <p>"Absolutely love this fit! True to size and is incredibly heavy and warm. Highly recommend for the streetwear look."</p>
                            </div>
                            <div className="product-review-item">
                                <div className="product-review-header">
                                    <strong>Liam M.</strong>
                                    <span>Verified Purchase</span>
                                </div>
                                <p>"Great quality fabric. Fits slightly oversized which is exactly what I wanted."</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
