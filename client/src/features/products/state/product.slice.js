import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        sellerProducts: [],
        loading: false,
        error: null,
        allProducts: [],
        activeProduct: {},
        similarProducts: [],
        productsByPage: {},
        totalPages: 1,
        similarTotalPages: 1,
        totalProducts: 0,
        similarProductsLoading: false,
        similarProductsError: null,
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
        },
        setSimilarProducts: (state, action) => {
            state.similarProducts = action.payload;
        },
        setActiveProduct: (state, action) => {
            state.activeProduct = action.payload;
        },
        setProductsForPage: (state, action) => {
            const { page, products } = action.payload;
            state.productsByPage[page] = products;
        },
        clearProductCache: (state) => {
            state.productsByPage = {};
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        setSimilarTotalPages: (state, action) => {
            state.similarTotalPages = action.payload;
        },
        setTotalProducts: (state, action) => {
            state.totalProducts = action.payload;
        },
        setSimilarProductsLoading: (state, action) => {
            state.similarProductsLoading = action.payload;
        },
        setSimilarProductsError: (state, action) => {
            state.similarProductsError = action.payload;
        },
    },
});

export const {
    setSellerProducts,
    setLoading,
    setError,
    setAllProducts,
    setSimilarProducts,
    setActiveProduct,
    setProductsForPage,
    clearProductCache,
    setTotalPages,
    setSimilarTotalPages,
    setTotalProducts,
    setSimilarProductsLoading,
    setSimilarProductsError,
} = productSlice.actions;

export default productSlice.reducer;
