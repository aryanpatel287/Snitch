import axios from 'axios';

const cartApiInstance = axios.create({
    baseURL: '/api/cart',
    withCredentials: true,
});

export const getCartItems = async () => {
    try {
        const response = await axios.get(cartApiInstance);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items', error);
        throw error;
    }
};

export const addToCart = async ({ productId, variantId, quantity }) => {
    try {
        const response = await axios.post(
            `${cartApiInstance}/${productId}/${variantId}`,
            {
                quantity,
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error adding to cart', error);
        throw error;
    }
};
