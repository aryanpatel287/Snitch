import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../../products/hooks/useProduct';
import EditorialProductCard from '../../products/components/EditorialProductCard';
import { Link } from 'react-router';

const Collection = () => {
    const { handleGetAllProducts } = useProduct();
    const allProducts = useSelector((state) => state.product.allProducts) || [];
    const loading = useSelector((state) => state.product.loading);

    useEffect(() => {
        handleGetAllProducts({ limit: 12 });
    }, []);

    // Filter and slice items
    const sortedByNew = [...allProducts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

    const sortedBySelling = [...allProducts]
        .sort((a, b) => a.title.localeCompare(b.title)) // different order for Top Selling visual variety
        .slice(2, 6);

    return (
        <section id="collections" className="collection-section">
            {/* New Arrivals Section */}
            <div className="collection">
                <div className="collection__header">
                    <h2 className="collection__title">NEW ARRIVALS</h2>
                </div>
                
                {loading && allProducts.length === 0 ? (
                    <div className="collection__loading">LOADING CURATION...</div>
                ) : (
                    <div className="collection__grid">
                        {sortedByNew.map((product) => (
                            <EditorialProductCard 
                                key={product._id} 
                                product={product} 
                                showMetadata={false}
                                to={`/products/${product._id}`}
                            />
                        ))}
                    </div>
                )}
                
                <div className="collection__actions">
                    <Link to="/products" className="button secondary-button collection__view-all">
                        View All
                    </Link>
                </div>
            </div>

            <hr className="collection-divider" />

            {/* Top Selling Section */}
            <div className="collection">
                <div className="collection__header">
                    <h2 className="collection__title">TOP SELLING</h2>
                </div>
                
                {loading && allProducts.length === 0 ? (
                    <div className="collection__loading">LOADING CURATION...</div>
                ) : (
                    <div className="collection__grid">
                        {sortedBySelling.map((product) => (
                            <EditorialProductCard 
                                key={product._id} 
                                product={product} 
                                showMetadata={false}
                                to={`/products/${product._id}`}
                            />
                        ))}
                    </div>
                )}
                
                <div className="collection__actions">
                    <Link to="/products" className="button secondary-button collection__view-all">
                        View All
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Collection;
