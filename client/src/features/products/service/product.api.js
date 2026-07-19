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

export async function getAllProducts(params) {
    try {
        const response = await productApiInstance.get('/', { params });
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

export async function updateProduct(productId, formData) {
    try {
        const response = await productApiInstance.put(
            `/seller/${productId}`,
            formData,
        );
        return response.data;
    } catch (error) {
        console.error('Error updating product', error);
        throw error;
    }
}

export async function createVariant(productId, variantData) {
    try {
        const response = await productApiInstance.post(
            `/seller/${productId}/variants`,
            variantData,
        );
        return response.data;
    } catch (error) {
        console.error('Error creating variant', error);
        throw error;
    }
}

export async function getProductsByCategory({ categoryId, params }) {
    try {
        const response = await productApiInstance.get(
            `/category/${categoryId}`,
            { params }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category', error);
        throw error;
    }
}
