import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductFilterProvider, useProductFilter } from './useProductFilter';
import { useProduct } from './useProduct';

vi.mock('./useProduct', () => ({
    useProduct: vi.fn(),
}));

const mockProducts = [
    {
        _id: '1',
        title: 'Snitch Black Shirt',
        description: 'Cotton slim fit shirt',
        price: { amount: 1500 },
        createdAt: '2026-01-01T00:00:00.000Z',
        variants: [
            { attributes: { color: 'Black', size: 'M' } }
        ]
    },
    {
        _id: '2',
        title: 'White Tee',
        description: 'Classic white tee',
        price: { amount: 999 },
        createdAt: '2026-01-02T00:00:00.000Z',
        variants: [
            { attributes: { color: 'White', size: 'L' } }
        ]
    }
];

describe('useProductFilter Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useProduct.mockReturnValue({
            handleGetAllProducts: vi.fn(),
            allProducts: mockProducts,
            loading: false,
            error: null,
        });
    });

    it('should initialize with default states and calculate products', () => {
        const wrapper = ({ children }) => (
            <MemoryRouter>
                <ProductFilterProvider>{children}</ProductFilterProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useProductFilter(), { wrapper });

        expect(result.current.allProducts).toEqual(mockProducts);
        expect(result.current.selectedCategory).toBe('');
        expect(result.current.priceRange).toBe(5000);
        expect(result.current.processedProducts).toHaveLength(2);
    });

    it('should filter by category/style', () => {
        const wrapper = ({ children }) => (
            <MemoryRouter>
                <ProductFilterProvider>{children}</ProductFilterProvider>
            </MemoryRouter>
        );

        const { result } = renderHook(() => useProductFilter(), { wrapper });

        act(() => {
            result.current.setSelectedCategory('Shirt');
        });

        expect(result.current.processedProducts).toHaveLength(1);
        expect(result.current.processedProducts[0]._id).toBe('1');
    });
});
