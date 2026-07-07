import React, { useState } from 'react';
import '../styles/_product-filters.scss';

const ProductFilters = ({
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    clearAllFilters,
    isOpen,
    setIsOpen
}) => {
    const categories = ['T-Shirts', 'Shirts', 'Hoodies', 'Jeans', 'Blazers', 'Casual', 'Formal', 'Gym', 'Party'];
    const colors = [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#ffffff' },
        { name: 'Red', hex: '#ff3333' },
        { name: 'Blue', hex: '#3357ff' },
        { name: 'Green', hex: '#33ff57' },
        { name: 'Yellow', hex: '#f3ff33' },
        { name: 'Orange', hex: '#ff9933' },
        { name: 'Pink', hex: '#ff3399' }
    ];
    const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

    return (
        <aside className={`product-filters ${isOpen ? 'product-filters--open' : ''}`}>
            <div className="product-filters__header-row">
                <h3 className="product-filters__title">Filters</h3>
                <button className="product-filters__close-btn" onClick={() => setIsOpen(false)} aria-label="Close filters">
                    <i className="ri-close-line"></i>
                </button>
            </div>
            
            <hr className="product-filters__divider" />

            {/* Categories Accordion */}
            <div className="product-filters__section">
                <h4 className="product-filters__section-title">Categories</h4>
                <div className="product-filters__categories-list">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`product-filters__category-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                        >
                            <span>{cat}</span>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    ))}
                </div>
            </div>

            <hr className="product-filters__divider" />

            {/* Price Filter */}
            <div className="product-filters__section">
                <h4 className="product-filters__section-title">Price</h4>
                <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="product-filters__price-slider"
                />
                <div className="product-filters__price-values">
                    <span>$0</span>
                    <span>${priceRange}</span>
                </div>
            </div>

            <hr className="product-filters__divider" />

            {/* Colors Filter */}
            <div className="product-filters__section">
                <h4 className="product-filters__section-title">Colors</h4>
                <div className="product-filters__colors-grid">
                    {colors.map((c) => (
                        <button
                            key={c.name}
                            className={`product-filters__color-swatch ${selectedColor === c.name ? 'active' : ''}`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                            onClick={() => setSelectedColor(selectedColor === c.name ? '' : c.name)}
                            aria-label={`Filter by color ${c.name}`}
                        >
                            {selectedColor === c.name && (
                                <i className="ri-check-line" style={{ color: c.name === 'White' || c.name === 'Yellow' ? '#000000' : '#ffffff' }}></i>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="product-filters__divider" />

            {/* Sizes Filter */}
            <div className="product-filters__section">
                <h4 className="product-filters__section-title">Sizes</h4>
                <div className="product-filters__sizes-grid">
                    {sizes.map((sz) => (
                        <button
                            key={sz}
                            className={`product-filters__size-pill ${selectedSize === sz ? 'active' : ''}`}
                            onClick={() => setSelectedSize(selectedSize === sz ? '' : sz)}
                        >
                            {sz}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="product-filters__divider" />

            {/* Clear All Button */}
            <button className="button primary-button product-filters__clear-btn" onClick={clearAllFilters}>
                Clear All Filters
            </button>
        </aside>
    );
};

export default ProductFilters;
