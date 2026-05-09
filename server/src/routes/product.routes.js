import { Router } from 'express';
import multer from 'multer';
import { authSeller, authUser } from '../middlewares/auth.middleware.js';
import {
    createProductContoller,
    getProductsController,
} from '../controllers/product.controller.js';
import { createProductValidator } from '../validators/product.validator.js';
import { get } from 'mongoose';

const productRouter = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/**
 * @route POST /api/products/create-product
 * @description Create a new product
 * @access Private (sellers only)
 * @body { title, description, price: { amount, currency }, images: [{ url, alt }] }
 */
productRouter.post(
    '/create-product',
    createProductValidator,
    upload.array('images', 7), // Allow up to 7 images
    authUser,
    authSeller,
    createProductContoller,
);

/**
 * @route GET /api/products/get-products
 * @description Get all products of a authenticated seller
 * @access Private (sellers only)
 * @body No body required
 */
productRouter.get('/get-products', authUser, authSeller, getProductsController);

export default productRouter;
