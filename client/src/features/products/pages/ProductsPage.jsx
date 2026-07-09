import React from 'react';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../landing/components/Footer';
import ProductFilters from '../components/ProductFilters';
import { ProductFilterProvider } from '../hooks/useProductFilter';
import ProductsBreadcrumbs from '../components/product-page/ProductsBreadcrumbs';
import ProductCatalogSection from '../components/product-page/ProductCatalogSection';
import '../styles/_products-page.scss';

const ProductsPage = () => {
    return (
        <ProductFilterProvider>
            <div className="products-page-container">
                <Navbar />

                <main className="products-page-main" id="main-content">
                    <ProductsBreadcrumbs />

                    <div className="products-page-layout">
                        {/* Left Column (Desktop Sidebar / Mobile Overlay) */}
                        <ProductFilters />

                        {/* Right Column */}
                        <ProductCatalogSection />
                    </div>
                </main>

                <Footer />
            </div>
        </ProductFilterProvider>
    );
};

export default ProductsPage;
