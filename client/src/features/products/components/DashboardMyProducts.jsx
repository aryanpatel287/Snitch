import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23f5f5f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="12" fill="%23000">NO IMAGE</text></svg>';

export const EditorialProductCard = ({ product, showMetadata = true, onClick }) => {
    const imageUrl = product.images?.[0]?.url || PLACEHOLDER_IMAGE;
    const imageAlt = product.images?.[0]?.alt || product.title;

    return (
        <div 
            className="editorial-product-card"
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <div className="product-card__image-container">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="product-card__image"
                />
            </div>
            <div className="product-card__details">
                <div className="product-card__header">
                    <h3 className="product-card__title">{product.title}</h3>
                    <span className="product-card__price">
                        {product.price?.currency === 'INR' ? '₹' : ''}
                        {product.price?.amount}
                    </span>
                </div>
                {showMetadata && (
                    <div className="product-card__metadata">
                        <span>Added: {new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const DashboardMyProducts = ({ mockProducts, onAddNewProduct }) => {

    const { sellerProducts, loading } = useSelector((state) => state.product);

    const { handleGetProducts } = useProduct();

    useEffect(() => {
        handleGetProducts();
    }, []);

    if (loading) return <div className="dashboard-loading">Loading...</div>;

    if (!loading && !sellerProducts) {
        return <div className="dashboard-error">Something went wrong.</div>;
    }

    if (sellerProducts.length === 0) return <div className="dashboard-empty">No products found.</div>;

    return (
        <div className="dashboard-my-products">
            <div className="dashboard-header-with-actions">
                <div>
                    <span className="dashboard-overline">03 / INVENTORY</span>
                    <h1 className="dashboard-title">My Catalog</h1>
                </div>
                <button
                    type="button"
                    className="button primary-button dashboard-header-btn"
                    onClick={onAddNewProduct}
                >
                    Add New Product
                </button>
            </div>

            <div className="products-grid">
                {sellerProducts.map((product) => (
                    <EditorialProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default DashboardMyProducts;
