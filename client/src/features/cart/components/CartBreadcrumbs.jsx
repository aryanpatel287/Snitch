import React from 'react';
import { Link } from 'react-router';
import '../styles/_cart-breadcrumbs.scss';

const CartBreadcrumbs = () => {
    return (
        <nav className="cart-breadcrumbs" aria-label="breadcrumb">
            <Link to="/" className="cart-breadcrumbs__link">
                Home
            </Link>
            <i className="ri-arrow-right-s-line cart-breadcrumbs__sep"></i>
            <span className="cart-breadcrumbs__current">Cart</span>
        </nav>
    );
};

export default CartBreadcrumbs;
