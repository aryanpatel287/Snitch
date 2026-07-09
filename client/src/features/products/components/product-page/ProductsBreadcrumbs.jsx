import React from 'react';
import { Link } from 'react-router';
import '../../styles/product-page/_products-breadcrumbs.scss';

const ProductsBreadcrumbs = () => {
    return (
        <nav className="products-breadcrumbs" aria-label="breadcrumb">
            <Link to="/" className="products-breadcrumbs__link">
                Home
            </Link>
            <i className="ri-arrow-right-s-line products-breadcrumbs__sep"></i>
            <span className="products-breadcrumbs__current">Shop</span>
        </nav>
    );
};

export default ProductsBreadcrumbs;
