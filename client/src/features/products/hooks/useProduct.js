import { getProducts, createProduct } from '../service/product.api';
import { useDispatch } from 'react-redux';
import {
    setSellerProducts,
    setLoading,
    setError,
} from '../state/product.slice';

// TODO:destructure the errors in the setError dispatch , see how to set the proper message in the error

export const useProduct = () => {
    const dispatch = useDispatch();

    async function handleCreateProducts(formData) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await createProduct(formData);
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

    async function handleGetProducts() {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await getProducts();
            dispatch(setSellerProducts(data.products));
        } catch (error) {
            console.error(error);
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }
};
