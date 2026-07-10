import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useCart } from '../../../cart/hooks/useCart';
import { useNavigate } from 'react-router';
import ProductInfo from './ProductInfo';

vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
}));

vi.mock('../../../cart/hooks/useCart', () => ({
    useCart: vi.fn(() => ({
        handleAddToCart: vi.fn(),
    })),
}));

vi.mock('react-router', () => ({
    useNavigate: vi.fn(),
}));

const mockProductWithMultipleAttributes = {
    _id: 'prod-1',
    title: 'Streetwear Tee',
    price: { amount: 1500, currency: 'INR' },
    description: 'A cool t-shirt',
    variants: [
        {
            _id: 'var-1',
            attributes: { color: 'Black', size: 'M' },
            stock: 10,
            price: { amount: 1500, currency: 'INR' },
        },
        {
            _id: 'var-2',
            attributes: { color: 'White', size: 'L' },
            stock: 5,
            price: { amount: 1600, currency: 'INR' },
        },
    ],
};

const mockProductWithWaistAttribute = {
    _id: 'prod-2',
    title: 'Streetwear Jeans',
    price: { amount: 2500, currency: 'INR' },
    description: 'Stark black jeans',
    variants: [
        {
            _id: 'var-3',
            attributes: { waist: '32' },
            stock: 8,
            price: { amount: 2500, currency: 'INR' },
        },
        {
            _id: 'var-4',
            attributes: { waist: '34' },
            stock: 12,
            price: { amount: 2500, currency: 'INR' },
        },
    ],
};

describe('ProductInfo Component - Dynamic Attributes', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useSelector.mockImplementation((selectorFn) => {
            const state = {
                cart: { error: '', loading: false },
                auth: {
                    user: { fullname: 'Buyer User', role: 'buyer' },
                    loading: false,
                },
            };
            return selectorFn(state);
        });
    });

    it('should render color swatches and size pills dynamically', () => {
        const handleVariantSelect = vi.fn();
        render(
            <ProductInfo
                product={mockProductWithMultipleAttributes}
                selectedVariant={null}
                onVariantSelect={handleVariantSelect}
            />,
        );

        // Color Swatch buttons (titles or labels)
        expect(screen.getByTitle('Black')).toBeInTheDocument();
        expect(screen.getByTitle('White')).toBeInTheDocument();

        // Size selector pills
        expect(screen.getByText('M')).toBeInTheDocument();
        expect(screen.getByText('L')).toBeInTheDocument();
    });

    it('should render other attributes (e.g. waist) as selector pills', () => {
        const handleVariantSelect = vi.fn();
        render(
            <ProductInfo
                product={mockProductWithWaistAttribute}
                selectedVariant={null}
                onVariantSelect={handleVariantSelect}
            />,
        );

        expect(screen.getByText('32')).toBeInTheDocument();
        expect(screen.getByText('34')).toBeInTheDocument();
        expect(screen.getByText('Select waist')).toBeInTheDocument();
    });

    it('should show correct validation message when selections are incomplete', async () => {
        const handleVariantSelect = vi.fn();
        render(
            <ProductInfo
                product={mockProductWithMultipleAttributes}
                selectedVariant={null}
                onVariantSelect={handleVariantSelect}
            />,
        );

        const addToCartButton = screen.getByText('ADD TO CART');
        fireEvent.click(addToCartButton);

        // Should ask for both color and size selection since both are present
        expect(
            screen.getByText('Please select a color and size.'),
        ).toBeInTheDocument();
    });
});
