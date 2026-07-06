import { Router } from 'express';
import { validateAddToCart } from '../validators/cart.validator.js';
import { authUser } from '../middlewares/auth.middleware.js';
import {
    addToCartController,
    getCartController,
} from '../controllers/cart.controller.js';
const cartRouter = new Router();

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add a product to cart
 * @access Private
 * @argument productId - The ID of the product to add to the cart
 * @argument variantId - The ID of the product variant to add to the cart
 * @argument quantity - The quantity of the product to add to the cart (optional, default is 1)
 */
cartRouter.post(
    '/add/:productId/:variantId',
    authUser,
    validateAddToCart,
    addToCartController,
);

/**
 * @route GET /api/cart
 * @desc Get the current user's cart
 * @access Private
 * @body No body required
 */
cartRouter.get('/', authUser, getCartController);

export default cartRouter;
