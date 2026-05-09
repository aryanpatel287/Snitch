import axios from 'axios';

const productApiInstance = axios.create({
    baseURL: '/api/products',
    withCredentials: true,
});

export async function createProduct(formData) {
    try {
        const response = await productApiInstance.post(
            '/create-product',
            formData,
        );
        return response.data;
    } catch (error) {
        console.error('Error creating product', error);
        throw error;
    }
}

export async function getProducts() {
    try {
        const response = await productApiInstance.get('/get-products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
}
