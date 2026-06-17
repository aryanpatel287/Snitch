import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../landing/components/Footer';
import ProductFilters from '../components/ProductFilters';
import EditorialProductCard from '../components/EditorialProductCard';
import { useProduct } from '../hooks/useProduct';
import '../styles/_products-page.scss';

const ProductsPage = () => {
    const { handleGetAllProducts, allProducts, loading, error } = useProduct();

    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    // Filter and sort products in-memory for instant feedback
    const processedProducts = useMemo(() => {
        if (!allProducts) return [];

        let result = [...allProducts];

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title?.toLowerCase().includes(query) ||
                    p.description?.toLowerCase().includes(query)
            );
        }

        // Sorting
        if (sortBy === 'price_asc') {
            result.sort((a, b) => (a.price?.amount || 0) - (b.price?.amount || 0));
        } else if (sortBy === 'price_desc') {
            result.sort((a, b) => (b.price?.amount || 0) - (a.price?.amount || 0));
        } else {
            // newest (default)
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return result;
    }, [allProducts, searchQuery, sortBy]);

    return (
        <div className="products-page-container texture-lines texture-grid">
            <Navbar />

            <main className="products-page-main" id="main-content">
                <div className="products-page-content">
                    <ProductFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />

                    {loading ? (
                        <div className="products-page__loading">
                            <span className="products-page__loading-text">RETRIEVING ARCHIVE...</span>
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
                                Adjust your filters or query to explore other curated products.
                            </p>
                        </div>
                    ) : (
                        <div className="products-page__grid">
                            {processedProducts.map((product) => (
                                <EditorialProductCard
                                    key={product._id}
                                    product={product}
                                    showMetadata={false}
                                    to={`/products/${product._id}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductsPage;
