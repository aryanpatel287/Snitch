import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../landing/components/Footer';
import ProductGallery from '../components/product-details/ProductGallery';
import ProductInfo from '../components/product-details/ProductInfo';
import SimilarProductsSection from '../components/product-details/SimilarProductsSection';
import { useProduct } from '../hooks/useProduct';
import '../styles/product-details/_product-details-page.scss';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { handleGetActiveProduct } = useProduct();

    const activeProduct = useSelector((state) => state.product.activeProduct);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        if (productId) {
            handleGetActiveProduct(productId);
            setSelectedVariant(null);
        }
    }, [productId]);

    const hasProductData =
        activeProduct &&
        Object.keys(activeProduct).length > 0 &&
        activeProduct._id === productId;

    return (
        <div className="product-details-container">
            <Navbar />

            <main className="product-details-main" id="main-content">
                {/* Breadcrumbs */}
                <nav
                    className="products-breadcrumbs"
                    aria-label="breadcrumb"
                    style={{ maxWidth: '1440px', margin: '0 auto 24px' }}
                >
                    <Link to="/" className="products-breadcrumbs__link">
                        Home
                    </Link>
                    <i className="ri-arrow-right-s-line products-breadcrumbs__sep"></i>
                    <Link to="/products" className="products-breadcrumbs__link">
                        Shop
                    </Link>
                    {hasProductData && (
                        <>
                            <i className="ri-arrow-right-s-line products-breadcrumbs__sep"></i>
                            <span className="products-breadcrumbs__current">
                                {activeProduct.title}
                            </span>
                        </>
                    )}
                </nav>

                <div className="product-details-content">
                    {loading ? (
                        <div className="product-details__loading">
                            <span className="product-details__loading-text">
                                RETRIEVING PRODUCT SPECIFICATIONS...
                            </span>
                        </div>
                    ) : error ? (
                        <div className="product-details__error">
                            <span className="product-details__error-title">
                                RETRIEVING ERROR
                            </span>
                            <p className="product-details__error-desc">
                                {error}
                            </p>
                            <Link
                                to="/products"
                                className="button secondary-button"
                            >
                                RETURN TO SHOP
                            </Link>
                        </div>
                    ) : !hasProductData ? (
                        <div className="product-details__empty">
                            <span className="product-details__empty-title">
                                PRODUCT NOT FOUND
                            </span>
                            <p className="product-details__empty-desc">
                                The requested product could not be located in
                                the catalog.
                            </p>
                            <Link
                                to="/products"
                                className="button secondary-button"
                            >
                                RETURN TO SHOP
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="product-details__layout">
                                <div className="product-details__left">
                                    <ProductGallery
                                        images={
                                            selectedVariant &&
                                            selectedVariant.images &&
                                            selectedVariant.images.length > 0
                                                ? selectedVariant.images
                                                : activeProduct.images
                                        }
                                        title={activeProduct.title}
                                    />
                                </div>
                                <div className="product-details__right">
                                    <ProductInfo
                                        product={activeProduct}
                                        selectedVariant={selectedVariant}
                                        onVariantSelect={setSelectedVariant}
                                    />
                                </div>
                            </div>

                            {/* Similar Products Section */}
                            <SimilarProductsSection
                                categoryId={activeProduct.category}
                                activeProductId={activeProduct._id}
                            />
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
