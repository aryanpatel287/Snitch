import cartModel from '../models/cart.model.js';
import { sendResponse } from '../utils/response.utlis.js';
import { stockOfProduct } from '../dao/product.dao.js';
import productModel from '../models/product.model.js';

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @route POST /api/cart/add/:productId
 * @desc Add a product to cart
 * @access Private
 * @argument productId - The ID of the product to add to the cart
 * @argument variantId - The ID of the product variant to add to the cart (optional)
 * @argument quantity - The quantity of the product to add to the cart (optional, default is 1)
 */
const addToCartController = async (req, res) => {
    let { productId, variantId } = req.params;
    const { quantity = 1 } = req.body;
    const userId = req.user._id;

    if (variantId === 'undefined' || variantId === 'null') {
        variantId = undefined;
    }

    try {
        const product = await productModel.findById(productId);

        if (!product) {
            return await sendResponse({
                res,
                statusCode: 404,
                message: 'Product not found',
                success: false,
                error: 'Product not found',
            });
        }

        let productPrice = product.price;
        if (variantId) {
            const variant = product.variants.id(variantId);
            if (!variant) {
                return await sendResponse({
                    res,
                    statusCode: 404,
                    message: 'Variant not found',
                    success: false,
                    error: 'Variant not found',
                });
            }
            productPrice = variant.price;
        }

        const stock = await stockOfProduct(productId, variantId);

        let cart =
            (await cartModel.findOne({ user: userId })) ||
            new cartModel({ user: userId, items: [] });

        const isProductInCart = cart.items.find(
            (item) =>
                item.product.toString() === productId &&
                (variantId
                    ? item.variant?.toString() === variantId
                    : !item.variant),
        );

        if (isProductInCart) {
            const quantityInCart = isProductInCart.quantity;
            if (stock < quantityInCart + quantity) {
                return await sendResponse({
                    res,
                    statusCode: 400,
                    message: 'Insufficient stock',
                    success: false,
                    error: 'Insufficient stock',
                });
            }

            isProductInCart.quantity += quantity;
            await cart.save();

            return await sendResponse({
                res,
                statusCode: 200,
                message: 'Product added to cart',
                success: true,
                cart,
            });
        }

        if (stock < quantity) {
            return await sendResponse({
                res,
                statusCode: 400,
                message: 'Insufficient stock. Available stock: ' + stock,
                success: false,
                error: 'Insufficient stock',
            });
        }

        cart.items.push({
            product: productId,
            variant: variantId,
            quantity,
            price: productPrice,
        });

        await cart.save();

        return await sendResponse({
            res,
            statusCode: 200,
            message: 'Product added to cart',
            success: true,
            cart,
        });
    } catch (error) {
        console.error(error);
        return await sendResponse({
            res,
            statusCode: 500,
            message: 'Failed to add product to cart',
            success: false,
            error: error.message,
        });
    }
};

/**
 * @route POST /api/cart/update/:productId/:variantId
 * @route POST /api/cart/update/:productId
 * @desc Update the quantity of a product in the cart
 * @access Private
 * @argument productId - The ID of the product to update in the cart
 * @argument variantId - The ID of the product variant to update in the cart (optional)
 * @argument quantity - The new quantity of the product in the cart
 */
const updateCartItemController = async (req, res) => {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    console.log(productId, variantId);

    try {
        const cart = await cartModel
            .findOne({ user: userId })
            .populate('items.product');

        if (!cart) {
            return await sendResponse({
                res,
                statusCode: 404,
                message: 'Cart not found',
                success: false,
                error: 'Cart not found',
            });
        }

        const isProductInCart = cart.items.find(
            (item) =>
                item.product._id.toString() === productId &&
                (variantId
                    ? item.variant._id?.toString() === variantId
                    : !item.variant._id),
        );

        if (!isProductInCart) {
            return await sendResponse({
                res,
                statusCode: 404,
                message: 'Product not found in cart',
                success: false,
                error: 'Product not found in cart',
            });
        }

        const stock = await stockOfProduct(productId, variantId);

        if (stock < quantity) {
            return await sendResponse({
                res,
                statusCode: 400,
                message: 'Insufficient stock. Available stock: ' + stock,
                success: false,
                error: 'Insufficient stock',
            });
        }

        const quantityInCart = isProductInCart.quantity;
        if (stock < quantityInCart + quantity) {
            return await sendResponse({
                res,
                statusCode: 400,
                message: 'Insufficient stock',
                success: false,
                error: 'Insufficient stock',
            });
        }

        isProductInCart.quantity += quantity;
        if (isProductInCart.quantity < 1) {
            cart.items.pull(isProductInCart);
        }
        await cart.save();

        return await sendResponse({
            res,
            statusCode: 200,
            message: 'Updated cart item successfully',
            success: true,
            cart,
        });
    } catch (error) {
        console.error(error);
        return await sendResponse({
            res,
            statusCode: 500,
            message: 'Failed to update cart item',
            success: false,
            error: error.message,
        });
    }
};

/**
 * @route POST /api/cart/remove/:productId/:variantId
 * @route POST /api/cart/remove/:productId
 * @desc Remove a product from cart
 * @access Private
 * @argument productId - The ID of the product to remove from the cart
 * @argument variantId - The ID of the product variant to remove from the cart (optional)
 */
const removeFromCartController = async (req, res) => {
    const { productId, variantId } = req.params;
    const userId = req.user._id;

    try {
        const cart = await cartModel
            .findOne({ user: userId })
            .populate('items.product');

        console.log('Cart:', cart);

        if (!cart) {
            return await sendResponse({
                res,
                statusCode: 404,
                message: 'Cart not found',
                success: false,
                error: 'Cart not found',
            });
        }

        const itemIndex = cart.items.findIndex(
            (item) =>
                item.product._id.toString() === productId &&
                (variantId
                    ? item.variant?.toString() === variantId
                    : !item.variant),
        );

        console.log('Item Index:', itemIndex);
        if (itemIndex === -1) {
            return await sendResponse({
                res,
                statusCode: 404,
                message: 'Product not found in cart',
                success: false,
                error: 'Product not found in cart',
            });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();

        return await sendResponse({
            res,
            statusCode: 200,
            message: 'Product removed from cart',
            success: true,
            cart,
        });
    } catch (error) {
        console.log(`Error removing product from cart: ${error.message}`);
        return await sendResponse({
            res,
            statusCode: 500,
            message: 'Failed to remove product from cart',
            success: false,
            error: error.message,
        });
    }
};

/**
 * @route GET /api/cart
 * @desc Get the current user's cart
 * @access Private
 * @body No body required
 */
const getCartController = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart =
            (await cartModel
                .findOne({ user: userId })
                .populate('items.product')) ||
            new cartModel({ user: userId, items: [] });

        return await sendResponse({
            res,
            statusCode: 200,
            message: 'Cart retrieved successfully',
            success: true,
            cart,
        });
    } catch (error) {
        console.error(error);
        return await sendResponse({
            res,
            statusCode: 500,
            message: 'Failed to retrieve cart',
            success: false,
            error: error.message,
        });
    }
};

export {
    addToCartController,
    getCartController,
    removeFromCartController,
    updateCartItemController,
};
