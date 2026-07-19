import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../../hooks/useProduct';
import EditorialProductCard from '../EditorialProductCard';

const SimilarProductsSection = ({ categoryId, activeProductId }) => {
    const { handleSimilarProducts } = useProduct();
    const similarProducts = useSelector((state) => state.product.similarProducts);
    const similarTotalPages = useSelector((state) => state.product.similarTotalPages);
    const similarProductsLoading = useSelector((state) => state.product.similarProductsLoading);
    const similarProductsError = useSelector((state) => state.product.similarProductsError);
    
    const [similarPage, setSimilarPage] = useState(1);

    // Reset page when active product changes
    useEffect(() => {
        setSimilarPage(1);
    }, [activeProductId]);

    // Fetch similar products when category, page or active product changes
    useEffect(() => {
        if (categoryId) {
            handleSimilarProducts({
                categoryId,
                page: similarPage,
                limit: 4,
                exclude: activeProductId
            });
        }
    }, [categoryId, similarPage, activeProductId]);

    if (similarProductsLoading && (!similarProducts || similarProducts.length === 0)) {
        return (
            <section className="similar-products">
                <div className="similar-products__header">
                    <h2 className="similar-products__title">YOU MIGHT ALSO LIKE</h2>
                </div>
                <div className="similar-products__loading">
                    RETRIEVING RECOMMENDATIONS...
                </div>
            </section>
        );
    }

    if (similarProductsError) {
        return (
            <section className="similar-products">
                <div className="similar-products__header">
                    <h2 className="similar-products__title">YOU MIGHT ALSO LIKE</h2>
                </div>
                <div className="similar-products__error">
                    {similarProductsError}
                </div>
            </section>
        );
    }

    if (!similarProducts || similarProducts.length === 0) return null;

    return (
        <section className="similar-products">
            <div className="similar-products__header">
                <h2 className="similar-products__title">YOU MIGHT ALSO LIKE</h2>
                {similarTotalPages > 1 && (
                    <div className="similar-products__nav">
                        <button
                            type="button"
                            onClick={() => setSimilarPage(prev => Math.max(prev - 1, 1))}
                            disabled={similarPage === 1 || similarProductsLoading}
                            className="similar-products__nav-btn"
                            aria-label="Previous page"
                        >
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                        <button
                            type="button"
                            onClick={() => setSimilarPage(prev => Math.min(prev + 1, similarTotalPages))}
                            disabled={similarPage === similarTotalPages || similarProductsLoading}
                            className="similar-products__nav-btn"
                            aria-label="Next page"
                        >
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                )}
            </div>
            <div className={`similar-products__grid ${similarProductsLoading ? 'similar-products__grid--loading' : ''}`}>
                {similarProducts.map((product) => (
                    <EditorialProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default SimilarProductsSection;
