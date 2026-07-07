import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../landing/components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { setItems } from '../state/cart.slice';
import '../styles/_cart-page.scss';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const { handleAddToCart, handleSetCartItems } = useCart();

    // Load cart items on mount
    useEffect(() => {
        handleSetCartItems();
        console.log('Cart items loaded:', cartItems);
    }, []);

    // Save cart items & dispatch update event
    const saveCart = (newItems) => {};

    const updateQuantity = (id, change) => {
        const item = cartItems.find((i) => i._id === id);
        if (!item) return;
        if (change === -1 && item.quantity <= 1) return;

        handleAddToCart({
            productId: item.product?._id,
            variantId: item.variant,
            quantity: change,
        });
    };

    const removeItem = (id) => {
        dispatch(setItems(cartItems.filter((item) => item._id !== id)));
    };

    // Helper to safely extract title, image, size, and color from cart item
    const getCartItemDetails = (item) => {
        const product = item.product;
        if (!product) return {};

        let title = product.title;
        let image = product.images?.[0]?.url || '';
        let size = null;
        let color = null;

        if (item.variant) {
            const variantObj = product.variants?.find(
                (v) => v._id.toString() === item.variant.toString(),
            );
            if (variantObj) {
                if (variantObj.images?.length > 0) {
                    image = variantObj.images[0].url;
                }
                const attrs = variantObj.attributes instanceof Map 
                    ? Object.fromEntries(variantObj.attributes)
                    : variantObj.attributes || {};
                
                size = attrs.size || attrs.Size || null;
                color = attrs.color || attrs.Color || null;
            }
        }

        return { title, image, size, color };
    };

    // Calculations
    const subtotal = cartItems?.reduce(
        (acc, item) => acc + (item.price?.amount || 0) * item.quantity,
        0,
    );
    const discount = subtotal > 0 ? subtotal * 0.2 : 0; // 20% discount
    const deliveryFee = subtotal > 0 ? 15 : 0;
    const total = subtotal - discount + deliveryFee;

    return (
        <div className="cart-page-container">
            <Navbar />

            <main className="cart-page-main" id="main-content">
                {/* Breadcrumbs */}
                <nav className="cart-breadcrumbs" aria-label="breadcrumb">
                    <Link to="/" className="cart-breadcrumbs__link">
                        Home
                    </Link>
                    <i className="ri-arrow-right-s-line cart-breadcrumbs__sep"></i>
                    <span className="cart-breadcrumbs__current">Cart</span>
                </nav>

                <h1 className="cart-title">YOUR CART</h1>

                {cartItems.length === 0 ? (
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
                ) : (
                    <div className="cart-layout">
                        {/* Left side: Cart Items List */}
                        <div className="cart-items-list">
                            {cartItems.map((item) => {
                                const { title, image, size, color } = getCartItemDetails(item);
                                return (
                                    <div key={item._id} className="cart-item-card">
                                        <div className="cart-item-card__img-container">
                                            <img
                                                src={image}
                                                alt={title}
                                                className="cart-item-card__img"
                                            />
                                        </div>

                                        <div className="cart-item-card__details">
                                            <div className="cart-item-card__header">
                                                <h3 className="cart-item-card__title">
                                                    {title}
                                                </h3>
                                                <button
                                                    className="cart-item-card__delete-btn"
                                                    onClick={() =>
                                                        removeItem(item._id)
                                                    }
                                                    aria-label="Remove item"
                                                >
                                                    <i className="ri-delete-bin-fill"></i>
                                                </button>
                                            </div>

                                            <p className="cart-item-card__attr">
                                                {size && (
                                                    <span>
                                                        Size:{' '}
                                                        <strong>{size}</strong>
                                                    </span>
                                                )}
                                                {color && (
                                                    <span>
                                                        Color:{' '}
                                                        <strong>
                                                            {color}
                                                        </strong>
                                                    </span>
                                                )}
                                            </p>

                                            <div className="cart-item-card__price-row">
                                                <span className="cart-item-card__price">
                                                    ₹{item.price?.amount || 0}
                                                </span>

                                                {/* Quantity Stepper */}
                                                <div className="cart-quantity-stepper">
                                                    <button
                                                        className="cart-quantity-stepper__btn"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item._id,
                                                                -1,
                                                            )
                                                        }
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <i className="ri-subtract-line"></i>
                                                    </button>
                                                    <span className="cart-quantity-stepper__val">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="cart-quantity-stepper__btn"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item._id,
                                                                1,
                                                            )
                                                        }
                                                        aria-label="Increase quantity"
                                                    >
                                                        <i className="ri-add-line"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right side: Summary Card */}
                        <aside className="cart-summary-card">
                            <h2 className="cart-summary-card__title">
                                Order Summary
                            </h2>

                            <div className="cart-summary-row">
                                <span className="cart-summary-row__label">
                                    Subtotal
                                </span>
                                <span className="cart-summary-row__value">
                                    ₹{subtotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="cart-summary-row cart-summary-row--discount">
                                <span className="cart-summary-row__label">
                                    Discount (-20%)
                                </span>
                                <span className="cart-summary-row__value">
                                    -₹{discount.toFixed(2)}
                                </span>
                            </div>

                            <div className="cart-summary-row">
                                <span className="cart-summary-row__label">
                                    Delivery Fee
                                </span>
                                <span className="cart-summary-row__value">
                                    ₹{deliveryFee.toFixed(2)}
                                </span>
                            </div>

                            <hr className="cart-summary-divider" />

                            <div className="cart-summary-row cart-summary-row--total">
                                <span className="cart-summary-row__label">
                                    Total
                                </span>
                                <span className="cart-summary-row__value">
                                    ₹{total.toFixed(2)}
                                </span>
                            </div>

                            <div className="cart-promo-section">
                                <div className="cart-promo-input-wrapper">
                                    <i className="ri-price-tag-3-line cart-promo-icon"></i>
                                    <input
                                        type="text"
                                        placeholder="Add promo code"
                                        className="cart-promo-input"
                                    />
                                </div>
                                <button className="button primary-button cart-promo-apply-btn">
                                    Apply
                                </button>
                            </div>

                            <button className="button primary-button cart-checkout-btn">
                                Go to Checkout{' '}
                                <i className="ri-arrow-right-line"></i>
                            </button>
                        </aside>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
