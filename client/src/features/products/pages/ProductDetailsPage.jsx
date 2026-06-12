import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import Navbar from '../../landing/components/Navbar';
import Footer from '../../landing/components/Footer';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import { useProduct } from '../hooks/useProduct';
import '../styles/_product-details-page.scss';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { handleGetActiveProduct, activeProduct, loading, error } = useProduct();

    useEffect(() => {
        if (productId) {
            handleGetActiveProduct(productId);
        }
    }, [productId]);

    const hasProductData = activeProduct && Object.keys(activeProduct).length > 0 && activeProduct._id === productId;

    return (
        <div className="product-details-container texture-lines texture-grid">
            <Navbar />

            <main className="product-details-main" id="main-content">
                <div className="product-details-content">
                    <div className="product-details__nav">
                        <Link to="/products" className="product-details__back-link">
                            <i className="ri-arrow-left-line"></i> BACK TO ALL PRODUCTS
                        </Link>
                    </div>

                    {loading ? (
                        <div className="product-details__loading">
                            <span className="product-details__loading-text">RETRIEVING PRODUCT SPECIFICATIONS...</span>
                        </div>
                    ) : error ? (
                        <div className="product-details__error">
                            <span className="product-details__error-title">ARCHIVE RETRIEVAL ERROR</span>
                            <p className="product-details__error-desc">{error}</p>
                            <Link to="/products" className="button secondary-button">
                                RETURN TO SHOP
                            </Link>
                        </div>
                    ) : !hasProductData ? (
                        <div className="product-details__empty">
                            <span className="product-details__empty-title">PRODUCT NOT FOUND</span>
                            <p className="product-details__empty-desc">
                                The requested product could not be located in the catalog archives.
                            </p>
                            <Link to="/products" className="button secondary-button">
                                RETURN TO SHOP
                            </Link>
                        </div>
                    ) : (
                        <div className="product-details__layout">
                            <div className="product-details__left">
                                <ProductGallery
                                    images={activeProduct.images}
                                    title={activeProduct.title}
                                />
                            </div>
                            <div className="product-details__right">
                                <ProductInfo product={activeProduct} />
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
