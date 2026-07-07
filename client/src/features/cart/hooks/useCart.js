import { addToCart, getCartItems } from '../service/cart.api';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, setError, setItems, setLoading } from '../state/cart.slice';

export const useCart = () => {
    const dispatch = useDispatch();

    async function handleSetCartItems() {
        dispatch(setLoading(true));
        try {
            const cart = await getCartItems();
            const items = [...cart.items];
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
            const item = await addToCart({ productId, variantId, quantity });
            dispatch(addItem(item));
        } catch (error) {
            dispatch(setError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleSetCartItems,
        handleAddToCart,
    };
};
