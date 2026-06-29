import axios from 'axios';

const productApiInstance = axios.create({
    baseURL: '/api/products',
    withCredentials: true,
});

export async function createProduct(formData) {
    try {
        const response = await productApiInstance.post(
            '/seller/create-product',
            formData,
        );
        return response.data;
    } catch (error) {
        console.error('Error creating product', error);
        throw error;
    }
}

export async function getSellerProducts() {
    try {
        const response = await productApiInstance.get('/seller/get-products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
}

export async function getAllProducts() {
    try {
        const response = await productApiInstance.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
}

export async function getActiveProduct(productId) {
    try {
        const response = await productApiInstance.get(`/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product', error);
        throw error;
    }
}
