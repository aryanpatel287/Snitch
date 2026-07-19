import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { useProduct } from './useProduct';
import { clearProductCache } from '../state/product.slice';

const ProductFilterContext = createContext(null);

export const ProductFilterProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { handleGetAllProducts } = useProduct();
    const productsByPage = useSelector((state) => state.product.productsByPage) || {};
    const totalPages = useSelector((state) => state.product.totalPages) || 1;
    const totalProducts = useSelector((state) => state.product.totalProducts) || 0;
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);
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

    // Whenever filters change, clear cache and reset page
    useEffect(() => {
        dispatch(clearProductCache());
        setCurrentPage(1);
    }, [
        searchUrlVal,
        selectedCategory,
        priceRange,
        selectedColor,
        selectedSize,
        sortBy,
        dispatch,
    ]);

    // Whenever current page or filters change, trigger query if not cached
    useEffect(() => {
        if (!productsByPage[currentPage]) {
            handleGetAllProducts({
                page: currentPage,
                limit: itemsPerPage,
                search: searchUrlVal,
                category: selectedCategory,
                priceRange,
                color: selectedColor,
                size: selectedSize,
                sortBy,
            });
        }
    }, [
        currentPage,
        searchUrlVal,
        selectedCategory,
        priceRange,
        selectedColor,
        selectedSize,
        sortBy,
        productsByPage,
    ]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const paginatedProducts = useMemo(() => {
        return productsByPage[currentPage] || [];
    }, [productsByPage, currentPage]);

    const processedProducts = useMemo(() => {
        return {
            length: totalProducts
        };
    }, [totalProducts]);

    const allProducts = useMemo(() => {
        return Object.values(productsByPage).flat();
    }, [productsByPage]);

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
