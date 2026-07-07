import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../landing/components/Footer';
import ProductFilters from '../components/ProductFilters';
import EditorialProductCard from '../components/EditorialProductCard';
import { useProduct } from '../hooks/useProduct';
import '../styles/_products-page.scss';

const ProductsPage = () => {
    const { handleGetAllProducts, allProducts = [], loading, error } = useProduct();
    const [searchParams, setSearchParams] = useSearchParams();

    // Local states linked to filters
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState(500);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Read URL Search Params on mount/change
    const searchUrlVal = searchParams.get('search') || '';
    const styleUrlVal = searchParams.get('style') || '';

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    // Set category if styled URL param is present
    useEffect(() => {
        if (styleUrlVal) {
            setSelectedCategory(styleUrlVal.charAt(0).toUpperCase() + styleUrlVal.slice(1));
        }
    }, [styleUrlVal]);

    const clearAllFilters = () => {
        setSelectedCategory('');
        setPriceRange(500);
        setSelectedColor('');
        setSelectedSize('');
        setSearchParams({});
    };

    // Filter & Sort Logic
    const processedProducts = useMemo(() => {
        let result = [...allProducts];

        // 1. Search Query filter (from URL)
        if (searchUrlVal.trim()) {
            const query = searchUrlVal.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title?.toLowerCase().includes(query) ||
                    p.description?.toLowerCase().includes(query)
            );
        }

        // 2. Category/Style filter
        if (selectedCategory) {
            const categoryQuery = selectedCategory.toLowerCase();
            result = result.filter((p) => {
                // check title, description or attributes
                const titleMatch = p.title?.toLowerCase().includes(categoryQuery);
                const descMatch = p.description?.toLowerCase().includes(categoryQuery);
                return titleMatch || descMatch;
            });
        }

        // 3. Price Filter (checking root product price)
        result = result.filter((p) => {
            const amt = p.price?.amount || 0;
            return amt <= priceRange;
        });

        // 4. Color filter (checks variants attributes)
        if (selectedColor) {
            const colorQuery = selectedColor.toLowerCase();
            result = result.filter((p) => {
                return p.variants?.some((v) => {
                    const cVal = v.attributes?.get ? v.attributes.get('color') : v.attributes?.color;
                    return cVal?.toLowerCase() === colorQuery;
                }) || p.title?.toLowerCase().includes(colorQuery);
            });
        }

        // 5. Size filter (checks variants attributes)
        if (selectedSize) {
            const sizeQuery = selectedSize.toLowerCase();
            result = result.filter((p) => {
                return p.variants?.some((v) => {
                    const sVal = v.attributes?.get ? v.attributes.get('size') : v.attributes?.size;
                    return sVal?.toLowerCase() === sizeQuery;
                }) || p.description?.toLowerCase().includes(sizeQuery);
            });
        }

        // 6. Sorting
        if (sortBy === 'price_asc') {
            result.sort((a, b) => (a.price?.amount || 0) - (b.price?.amount || 0));
        } else if (sortBy === 'price_desc') {
            result.sort((a, b) => (b.price?.amount || 0) - (a.price?.amount || 0));
        } else {
            // newest
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return result;
    }, [allProducts, searchUrlVal, selectedCategory, priceRange, selectedColor, selectedSize, sortBy]);

    // Paginated subset
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [processedProducts, currentPage]);

    const totalPages = Math.ceil(processedProducts.length / itemsPerPage) || 1;

    // Reset to page 1 on filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchUrlVal, selectedCategory, priceRange, selectedColor, selectedSize, sortBy]);

    return (
        <div className="products-page-container">
            <Navbar />

            <main className="products-page-main" id="main-content">
                {/* Breadcrumbs */}
                <nav className="products-breadcrumbs" aria-label="breadcrumb">
                    <Link to="/" className="products-breadcrumbs__link">Home</Link>
                    <i className="ri-arrow-right-s-line products-breadcrumbs__sep"></i>
                    <span className="products-breadcrumbs__current">Shop</span>
                </nav>

                <div className="products-page-layout">
                    {/* Left Column (Desktop Sidebar / Mobile Overlay) */}
                    <ProductFilters
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        clearAllFilters={clearAllFilters}
                        isOpen={isMobileFiltersOpen}
                        setIsOpen={setIsMobileFiltersOpen}
                    />

                    {/* Right Column */}
                    <div className="products-catalog-section">
                        <div className="products-catalog-header">
                            <div>
                                <h1 className="products-catalog-title">
                                    {selectedCategory ? `${selectedCategory}` : 'Shop'}
                                </h1>
                                <span className="products-catalog-count">
                                    Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, processedProducts.length)} of {processedProducts.length} Products
                                </span>
                            </div>

                            <div className="products-catalog-controls">
                                <button className="products-mobile-filter-trigger" onClick={() => setIsMobileFiltersOpen(true)}>
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
                                <span className="products-page__loading-text">RETRIEVING CATALOG...</span>
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

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="products-pagination">
                                        <button
                                            className="products-pagination__btn"
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
                                        >
                                            <i className="ri-arrow-left-line"></i> Previous
                                        </button>
                                        <div className="products-pagination__numbers">
                                            {Array.from({ length: totalPages }).map((_, i) => (
                                                <button
                                                    key={i}
                                                    className={`products-pagination__num-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            className="products-pagination__btn"
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
                                        >
                                            Next <i className="ri-arrow-right-line"></i>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductsPage;
