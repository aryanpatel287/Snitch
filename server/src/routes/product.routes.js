import { Router } from 'express';
import { authSeller, authUser } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';
import {
    createProductController,
    getAProductController,
    getProductsController,
    getSellerProductsController,
    updateProductController,
    createVariantController,
} from '../controllers/product.controller.js';
import {
    createProductValidator,
    createVariantValidator,
    updateProductValidator,
} from '../validators/product.validator.js';

const productRouter = Router();

/**
 * @route POST /api/products/seller/create-product
 * @description Create a new product
 * @access Private (sellers only)
 * @body { title, description, price: { amount, currency }, images: [{ url, alt }] }
 */
productRouter.post(
    '/seller/create-product',
    upload.array('images', 7), // Allow up to 7 images
    authUser,
    authSeller,
    createProductValidator,
    createProductController,
);

/**
 * @route PUT /api/products/seller/:productId
 * @description Update a product
 * @access Private (sellers only)
 * @body { title, description, price: { amount, currency }, images, variants }
 */
productRouter.put(
    '/seller/:productId',
    authUser,
    authSeller,
    updateProductValidator,
    updateProductController,
);

/**
 * @route GET /api/products/seller/get-products
 * @description Get all products of a authenticated seller
 * @access Private (sellers only)
 * @body No body required
 */
productRouter.get(
    '/seller/get-products',
    authUser,
    authSeller,
    getSellerProductsController,
);

/**
 * @route GET /api/products
 * @description Get all products
 * @access Public
 * @body No body required
 */
productRouter.get('/', getProductsController);

/**
 * @route GET /api/products/:productId
 * @description Get a single product
 * @access Public
 * @body No body required
 */
productRouter.get('/:productId', getAProductController);

/**
 * @route POST /api/products/:productId/variants
 * @description Create a new variant for a product
 * @access Private (sellers only)
 * @body { title, description, price: { amount, currency }, stock, images: [{ url, alt }] }
 */
productRouter.post(
    '/seller/:productId/variants',
    createVariantValidator,
    authUser,
    authSeller,
    createVariantController,
);

export default productRouter;
