import { useDispatch, useSelector } from 'react-redux';
import { getProducts, createProduct } from '../service/product.api';
import {
    setSellerProducts,
    setLoading,
    setError,
} from '../state/product.slice';

export const useProduct = () => {
    const dispatch = useDispatch();
    const { sellerProducts, loading, error } = useSelector(
        (state) => state.product,
    );

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

    async function handleGetProducts() {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await getProducts();
            dispatch(setSellerProducts(data.products));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleCreateProducts, handleGetProducts, sellerProducts, loading, error };
};
