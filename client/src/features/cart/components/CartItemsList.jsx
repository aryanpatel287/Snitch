import React from 'react';
import { useSelector } from 'react-redux';
import CartItemCard from './CartItemCard';
import '../styles/_cart-items-list.scss';

const CartItemsList = () => {
    const cartItems = useSelector((state) => state.cart.items);

    return (
        <div className="cart-items-list">
            {cartItems.map((item) => (
                <CartItemCard key={item._id} item={item} />
            ))}
        </div>
    );
};

export default CartItemsList;
