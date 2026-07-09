import { param, validationResult, body } from 'express-validator';
import { sendResponse } from '../utils/response.utlis.js';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse({
            res,
            statusCode: 400,
            success: false,
            message: 'Validation Error',
            error: errors.array(),
        });
    }
    next();
};

export const validateAddToCart = [
    param('productId').isMongoId().withMessage('Invalid Product ID'),
    param('variantId').optional().isMongoId().withMessage('Invalid Variant ID'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),

    validateRequest,
];

export const validateUpdateCartItem = [
    param('productId').isMongoId().withMessage('Invalid Product ID'),
    param('variantId').optional().isMongoId().withMessage('Invalid Variant ID'),
    body('quantity').isInt().withMessage('Quantity must be a Integer'),

    validateRequest,
];

export const validateRemoveFromCart = [
    param('productId').isMongoId().withMessage('Invalid Product ID'),
    param('variantId').optional().isMongoId().withMessage('Invalid Variant ID'),

    validateRequest,
];
