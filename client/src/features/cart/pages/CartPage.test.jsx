import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { useSelector } from 'react-redux';
import CartPage from '../pages/CartPage';

// Mock localStorage stub for headless environment
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
        removeItem: (key) => {
            delete store[key];
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

let mockState = {
    cart: { items: [] },
    auth: { user: null },
    user: { user: null }
};

vi.mock('react-redux', () => ({
    useSelector: vi.fn((fn) => fn(mockState)),
    useDispatch: vi.fn(() => vi.fn()),
}));

describe('CartPage Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        window.localStorage.clear();
        mockState.cart.items = [];
        mockState.auth = { user: null };
        mockState.user = { user: null };
    });

    it('should render empty state when cart is empty', () => {
        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>,
        );

        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
        expect(screen.getByText('Go To Shop')).toBeInTheDocument();
    });

    it('should render cart items and calculate price breakdown correctly', () => {
        const mockCart = [
            {
                id: 'prod1-Black-L',
                productId: 'prod1',
                title: 'Street Hoodie',
                image: '/hoodie.png',
                price: 100,
                color: 'Black',
                size: 'L',
                quantity: 2,
            },
        ];
        mockState.cart.items = mockCart;

        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>,
        );

        // Verify item details are rendered
        expect(screen.getByText('Street Hoodie')).toBeInTheDocument();
        expect(screen.getByText('L')).toBeInTheDocument();
        expect(screen.getByText('Black')).toBeInTheDocument();
        expect(screen.getByText('$100')).toBeInTheDocument();
        expect(
            screen.getByText('2', { selector: '.cart-quantity-stepper__val' }),
        ).toBeInTheDocument();

        // Subtotal: 100 * 2 = 200
        // Discount: 200 * 0.2 = 40
        // Delivery: 15
        // Total: 200 - 40 + 15 = 175
        expect(screen.getByText('$200.00')).toBeInTheDocument();
        expect(screen.getByText('-$40.00')).toBeInTheDocument();
        expect(screen.getByText('$15.00')).toBeInTheDocument();
        expect(screen.getByText('$175.00')).toBeInTheDocument();
    });

    it('should increment and decrement quantity and update calculations', () => {
        const mockCart = [
            {
                id: 'prod1-Black-L',
                productId: 'prod1',
                title: 'Street Hoodie',
                image: '/hoodie.png',
                price: 100,
                color: 'Black',
                size: 'L',
                quantity: 1,
            },
        ];
        mockState.cart.items = mockCart;

        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>,
        );

        expect(
            screen.getByText('1', { selector: '.cart-quantity-stepper__val' }),
        ).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument(); // Subtotal

        // Increment
        const incrementBtn = screen.getByLabelText('Increase quantity');
        fireEvent.click(incrementBtn);

        expect(
            screen.getByText('2', { selector: '.cart-quantity-stepper__val' }),
        ).toBeInTheDocument();
        expect(screen.getByText('$200.00')).toBeInTheDocument(); // Subtotal updated

        // Decrement
        const decrementBtn = screen.getByLabelText('Decrease quantity');
        fireEvent.click(decrementBtn);

        expect(
            screen.getByText('1', { selector: '.cart-quantity-stepper__val' }),
        ).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument(); // Subtotal updated back
    });

    it('should remove item from cart when delete button is clicked', () => {
        const mockCart = [
            {
                id: 'prod1-Black-L',
                productId: 'prod1',
                title: 'Street Hoodie',
                image: '/hoodie.png',
                price: 100,
                color: 'Black',
                size: 'L',
                quantity: 1,
            },
        ];
        mockState.cart.items = mockCart;

        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>,
        );

        expect(screen.getByText('Street Hoodie')).toBeInTheDocument();

        const deleteBtn = screen.getByLabelText('Remove item');
        fireEvent.click(deleteBtn);

        // Should return to empty state
        expect(screen.queryByText('Street Hoodie')).not.toBeInTheDocument();
        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });
});
