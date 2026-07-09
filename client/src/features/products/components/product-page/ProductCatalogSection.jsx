import React from 'react';
import { useProductFilter } from '../../hooks/useProductFilter';
import EditorialProductCard from '../EditorialProductCard';
import ProductPagination from './ProductPagination';
import '../../styles/product-page/_products-catalog-section.scss';

const ProductCatalogSection = () => {
    const {
        loading,
        error,
        allProducts,
        processedProducts,
        paginatedProducts,
        selectedCategory,
        currentPage,
        itemsPerPage,
        sortBy,
        setSortBy,
        setIsMobileFiltersOpen,
    } = useProductFilter();

    return (
        <div className="products-catalog-section">
            <div className="products-catalog-header">
                <div>
                    <h1 className="products-catalog-title">
                        {selectedCategory ? `${selectedCategory}` : 'Shop'}
                    </h1>
                    <span className="products-catalog-count">
                        Showing {(currentPage - 1) * itemsPerPage + 1}-
                        {Math.min(currentPage * itemsPerPage, processedProducts.length)} of{' '}
                        {processedProducts.length} Products
                    </span>
                </div>

                <div className="products-catalog-controls">
                    <button
                        className="products-mobile-filter-trigger"
                        onClick={() => setIsMobileFiltersOpen(true)}
                    >
                        <i className="ri-equalizer-line"></i> Filters
                    </button>

                    <div className="products-sort-wrapper">
                        <span className="products-sort-label">Sort by:</span>
                        <select
                            className="products-sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            aria-label="Sort products"
                        >
                              <option value="newest">Newest</option>
                              <option value="price_asc">Price: Low to High</option>
                              <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading && allProducts.length === 0 ? (
                <div className="products-page__loading">
                    <span className="products-page__loading-text">
                        RETRIEVING CATALOG...
                    </span>
                </div>
            ) : error ? (
                <div className="products-page__error">
                    <span className="products-page__error-title">SYSTEM ERROR</span>
                    <p className="products-page__error-desc">{error}</p>
                </div>
            ) : processedProducts.length === 0 ? (
                <div className="products-page__empty">
                    <span className="products-page__empty-title">NO RESULTS FOUND</span>
                    <p className="products-page__empty-desc">
                        Adjust your filter criteria to discover our collection.
                    </p>
                </div>
            ) : (
                <>
                    <div className="products-page__grid">
                        {paginatedProducts.map((product) => (
                            <EditorialProductCard
                                key={product._id}
                                product={product}
                                showMetadata={false}
                                to={`/products/${product._id}`}
                            />
                        ))}
                    </div>

                    <ProductPagination />
                </>
            )}
        </div>
    );
};

export default ProductCatalogSection;
