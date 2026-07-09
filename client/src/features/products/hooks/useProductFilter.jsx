import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useProduct } from './useProduct';

const ProductFilterContext = createContext(null);

export const ProductFilterProvider = ({ children }) => {
    const {
        handleGetAllProducts,
        allProducts = [],
        loading,
        error,
    } = useProduct();
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState(5000);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const searchUrlVal = searchParams.get('search') || '';
    const styleUrlVal = searchParams.get('style') || '';

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    useEffect(() => {
        if (styleUrlVal) {
            setSelectedCategory(
                styleUrlVal.charAt(0).toUpperCase() + styleUrlVal.slice(1),
            );
        }
    }, [styleUrlVal]);

    const clearAllFilters = () => {
        setSelectedCategory('');
        setPriceRange(5000);
        setSelectedColor('');
        setSelectedSize('');
        setSearchParams({});
    };

    const processedProducts = useMemo(() => {
        let result = [...allProducts];

        if (searchUrlVal.trim()) {
            const query = searchUrlVal.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title?.toLowerCase().includes(query) ||
                    p.description?.toLowerCase().includes(query),
            );
        }

        if (selectedCategory) {
            const categoryQuery = selectedCategory.toLowerCase();
            result = result.filter((p) => {
                const titleMatch = p.title
                    ?.toLowerCase()
                    .includes(categoryQuery);
                const descMatch = p.description
                    ?.toLowerCase()
                    .includes(categoryQuery);
                return titleMatch || descMatch;
            });
        }

        result = result.filter((p) => {
            const amt = p.price?.amount || 0;
            return amt <= priceRange;
        });

        if (selectedColor) {
            const colorQuery = selectedColor.toLowerCase();
            result = result.filter((p) => {
                return (
                    p.variants?.some((v) => {
                        const cVal = v.attributes?.get
                            ? v.attributes.get('color')
                            : v.attributes?.color;
                        return cVal?.toLowerCase() === colorQuery;
                    }) || p.title?.toLowerCase().includes(colorQuery)
                );
            });
        }

        if (selectedSize) {
            const sizeQuery = selectedSize.toLowerCase();
            result = result.filter((p) => {
                return (
                    p.variants?.some((v) => {
                        const sVal = v.attributes?.get
                            ? v.attributes.get('size')
                            : v.attributes?.size;
                        return sVal?.toLowerCase() === sizeQuery;
                    }) || p.description?.toLowerCase().includes(sizeQuery)
                );
            });
        }

        if (sortBy === 'price_asc') {
            result.sort(
                (a, b) => (a.price?.amount || 0) - (b.price?.amount || 0),
            );
        } else if (sortBy === 'price_desc') {
            result.sort(
                (a, b) => (b.price?.amount || 0) - (a.price?.amount || 0),
            );
        } else {
            result.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
        }

        return result;
    }, [
        allProducts,
        searchUrlVal,
        selectedCategory,
        priceRange,
        selectedColor,
        selectedSize,
        sortBy,
    ]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [processedProducts, currentPage]);

    const totalPages = Math.ceil(processedProducts.length / itemsPerPage) || 1;

    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchUrlVal,
        selectedCategory,
        priceRange,
        selectedColor,
        selectedSize,
        sortBy,
    ]);

    const value = {
        allProducts,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        selectedColor,
        setSelectedColor,
        selectedSize,
        setSelectedSize,
        sortBy,
        setSortBy,
        isMobileFiltersOpen,
        setIsMobileFiltersOpen,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        processedProducts,
        paginatedProducts,
        totalPages,
        clearAllFilters,
        searchUrlVal,
    };

    return (
        <ProductFilterContext.Provider value={value}>
            {children}
        </ProductFilterContext.Provider>
    );
};

export const useProductFilter = () => {
    const context = useContext(ProductFilterContext);
    if (!context) {
        throw new Error('useProductFilter must be used within a ProductFilterProvider');
    }
    return context;
};
