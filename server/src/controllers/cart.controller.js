import cartModel from '../models/cart.model.js';
import { sendResponse } from '../utils/response.utlis.js';
import { stockOfProduct } from '../dao/product.dao.js';
import productModel from '../models/product.model.js';

const addToCartController = async (req, res) => {
    const { productId, variantId } = req.params;
    const { quantity = 1 } = req.body;
    const userId = req.user._id;

    try {
        const product = await productModel.find({
            id: productId,
            'variants._id': variantId,
        });

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
            const variant = product.variants.find(
                (v) => v._id.toString() === variantId,
            );

            productPrice = variant.price;
        }

        const stock = await stockOfProduct(productId, variantId);

        let cart =
            (await cartModel.findOne({ user: userId })) ||
            new cartModel({ user: userId, items: [] });

        const isProductInCart = cart.items.find(
            (item) =>
                item.product.toString() === productId &&
                item.variant.toString() === variantId,
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
        }

        if (stock < quantity) {
            return await sendResponse({
                res,
                statusCode: 400,
                message: 'Insufficient stock',
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

export { addToCartController, getCartController };
