import { useDispatch, useSelector } from 'react-redux';
import {
    getSellerProducts,
    createProduct,
    getActiveProduct,
    getAllProducts,
    createVariant,
    updateProduct,
    getProductsByCategory,
} from '../service/product.api';
import {
    setSellerProducts,
    setActiveProduct,
    setAllProducts,
    setLoading,
    setError,
    setSimilarProducts,
    setProductsForPage,
    setTotalPages,
    setSimilarTotalPages,
    setTotalProducts,
    setSimilarProductsLoading,
    setSimilarProductsError,
} from '../state/product.slice';

export const useProduct = () => {
    const dispatch = useDispatch();
    const productsByPage = useSelector((state) => state.product.productsByPage);

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

    async function handleGetAllProducts(params = {}) {
        const page = params.page || 1;

        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await getAllProducts(params);
            dispatch(setAllProducts(data.products));
            dispatch(setProductsForPage({ page, products: data.products }));
            dispatch(setTotalPages(data.totalPages));
            dispatch(setTotalProducts(data.totalProducts));
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

    async function handleSimilarProducts({ categoryId, page = 1, limit = 4, exclude }) {
        dispatch(setSimilarProductsLoading(true));
        dispatch(setSimilarProductsError(null));

        try {
            const data = await getProductsByCategory({
                categoryId,
                params: { page, limit, exclude }
            });
            dispatch(setSimilarProducts(data.productsByCategory));
            dispatch(setSimilarTotalPages(data.totalPages));
        } catch (error) {
            dispatch(setSimilarProductsError(error.response?.data?.message ?? error.message));
        } finally {
            dispatch(setSimilarProductsLoading(false));
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
        handleSimilarProducts,
    };
};
