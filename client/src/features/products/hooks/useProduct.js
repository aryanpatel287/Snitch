import { useDispatch, useSelector } from 'react-redux';
import {
    getSellerProducts,
    createProduct,
    getActiveProduct,
    getAllProducts,
    createVariant,
    updateProduct,
} from '../service/product.api';
import {
    setSellerProducts,
    setActiveProduct,
    setAllProducts,
    setLoading,
    setError,
} from '../state/product.slice';

export const useProduct = () => {
    const dispatch = useDispatch();
    const { sellerProducts, activeProduct, allProducts, loading, error } =
        useSelector((state) => state.product);

    async function handleCreateProducts(formData) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await createProduct(formData);
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetSellerProducts() {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data.products));
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetAllProducts() {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await getAllProducts();
            dispatch(setAllProducts(data.products));
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetActiveProduct(productId) {
        dispatch(setLoading(true));
        dispatch(setError(null));
        dispatch(setActiveProduct({}));

        try {
            const data = await getActiveProduct(productId);
            dispatch(setActiveProduct(data.product));
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleCreateVariant(productId, formData) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await createVariant(productId, formData);
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleUpdateProduct(productId, productData) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await updateProduct(productId, productData);
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleCreateProducts,
        handleGetSellerProducts,
        handleGetAllProducts,
        handleGetActiveProduct,
        handleCreateVariant,
        handleUpdateProduct,
        handleGetProducts: handleGetSellerProducts,
        sellerProducts,
        allProducts,
        activeProduct,
        loading,
        error,
    };
};
