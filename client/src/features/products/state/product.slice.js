import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        sellerProducts: [],
        loading: false,
        error: null,
        allProducts: [],
        activeProduct: {},
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
        setActiveProduct: (state, action) => {
            state.activeProduct = action.payload;
        },
    },
});

export const {
    setSellerProducts,
    setLoading,
    setError,
    setAllProducts,
    setActiveProduct,
} = productSlice.actions;

export default productSlice.reducer;
