import {
    addToCart,
    getCartItems,
    removeFromCart,
    updateCartItem,
} from '../service/cart.api';
import { useDispatch } from 'react-redux';
import { setError, setItems, setLoading } from '../state/cart.slice';

export const useCart = () => {
    const dispatch = useDispatch();

    async function handleSetCartItems() {
        dispatch(setLoading(true));
        try {
            const data = await getCartItems();
            const items = data?.cart?.items || [];
            dispatch(setItems(items));
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleAddToCart({ productId, variantId, quantity }) {
        dispatch(setLoading(true));
        try {
            const data = await addToCart({ productId, variantId, quantity });
            const items = data?.cart?.items || [];
            dispatch(setItems(items));
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleRemoveFromCart({ productId, variantId }) {
        dispatch(setLoading(true));
        try {
            const data = await removeFromCart({ productId, variantId });
            const items = data?.cart?.items || [];
            dispatch(setItems(items));
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleUpdateCartItem({ productId, variantId, quantity }) {
        dispatch(setLoading(true));
        try {
            const data = await updateCartItem({
                productId,
                variantId,
                quantity,
            });
            const items = data?.cart?.items || [];
            dispatch(setItems(items));
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleSetCartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateCartItem,
    };
};
