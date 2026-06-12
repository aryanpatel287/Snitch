import { useDispatch, useSelector } from 'react-redux';
import {
    getSellerProducts,
    createProduct,
    getActiveProduct,
    getAllProducts,
} from '../service/product.api';
import {
    setSellerProducts,
    setActiveProduct,
    setAllProducts,
    setLoading,
    setError,
} from '../state/product.slice';

// TODO:destructure the errors in the setError dispatch , see how to set the proper message in the error

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
            console.error('error : ', error);
            console.log(
                'error.response?.data?.message: ',
                error.response?.data?.message,
            );
            console.log('error.message: ', error.message);
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
            console.error(error);
            dispatch(setError(error.message));
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
            console.error(error);
            dispatch(setError(error.message));
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
            console.error(error);
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleCreateProducts,
        handleGetSellerProducts,
        handleGetAllProducts,
        handleGetActiveProduct,
        handleGetProducts: handleGetSellerProducts,
        sellerProducts,
        allProducts,
        activeProduct,
        loading,
        error,
    };
};
