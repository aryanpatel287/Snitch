import { Router } from 'express';
import multer from 'multer';
import { authSeller, authUser } from '../middlewares/auth.middleware.js';
import {
    createProductContoller,
    getAProductController,
    getProductsController,
    getSellerProductsController,
} from '../controllers/product.controller.js';
import { createProductValidator } from '../validators/product.validator.js';

const productRouter = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/**
 * @route POST /api/products/seller/create-product
 * @description Create a new product
 * @access Private (sellers only)
 * @body { title, description, price: { amount, currency }, images: [{ url, alt }] }
 */
productRouter.post(
    '/seller/create-product',
    upload.array('images', 7), // Allow up to 7 images
    createProductValidator,
    authUser,
    authSeller,
    createProductContoller,
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

export default productRouter;
