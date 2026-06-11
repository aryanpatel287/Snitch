import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct';

const DashboardMyProducts = ({ mockProducts, onAddNewProduct }) => {

    const { sellerProducts, loading } = useSelector((state) => state.product);

    const { handleGetProducts } = useProduct();

    useEffect(() => {
        handleGetProducts();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!loading && !sellerProducts) {
        return <div>Something went wrong.</div>;
    }

    if (sellerProducts.length === 0) return <div>No products found.</div>;

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
                    <div key={product._id} className="editorial-product-card">
                        <div className="product-card__image-container">
                            <img
                                src={product.images[0]?.url}
                                alt={product.images[0]?.alt || product.title}
                                className="product-card__image"
                            />
                        </div>
                        <div className="product-card__details">
                            <div className="product-card__header">
                                <h3 className="product-card__title">{product.title}</h3>
                                <span className="product-card__price">
                                    {product.price.currency === 'INR' ? '₹' : ''}
                                    {product.price.amount}
                                </span>
                            </div>
                            <div className="product-card__metadata">
                                <span>Added: {new Date(product.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardMyProducts;
