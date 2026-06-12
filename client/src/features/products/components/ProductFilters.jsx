import React from 'react';
import { Search } from 'lucide-react';
import '../styles/_product-filters.scss';

const ProductFilters = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => {
    return (
        <div className="product-filters">
            <div className="product-filters__search-wrapper">
                <input
                    type="text"
                    className="product-filters__search-input"
                    placeholder="SEARCH PRODUCTS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search products"
                />
                <Search className="product-filters__search-icon" size={16} strokeWidth={1.5} />
            </div>

            <div className="product-filters__sort">
                <span className="product-filters__sort-label">SORT /</span>
                <select
                    className="product-filters__sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort products"
                >
                    <option value="newest">NEWEST RELEASES</option>
                    <option value="price_asc">PRICE: LOW TO HIGH</option>
                    <option value="price_desc">PRICE: HIGH TO LOW</option>
                </select>
            </div>
        </div>
    );
};

export default ProductFilters;
