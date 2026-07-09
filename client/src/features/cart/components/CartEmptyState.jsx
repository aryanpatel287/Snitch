import React from 'react';
import { Link } from 'react-router';
import '../styles/_cart-empty-state.scss';

const CartEmptyState = () => {
    return (
        <div className="cart-empty-state">
            <i className="ri-shopping-cart-2-line cart-empty-state__icon"></i>
            <p className="cart-empty-state__text">
                Your cart is empty.
            </p>
            <Link
                to="/products"
                className="button primary-button cart-empty-state__btn"
            >
                Go To Shop
            </Link>
        </div>
    );
};

export default CartEmptyState;
