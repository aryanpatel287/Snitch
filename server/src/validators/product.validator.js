import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import { sendResponse } from '../utils/response.utlis.js';

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse({
            res,
            statusCode: 400,
            message: 'Validation failed',
            success: false,
            errors: errors.array(),
        });
    }
    return next();
}

export const createProductValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('priceAmount')
        .isNumeric()
        .withMessage('Price amount must be a number')
        .custom((value) => value >= 0)
        .withMessage('Price amount must be a positive number'),
    body('priceCurrency')
        .notEmpty()
        .isIn(['USD', 'INR', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'])
        .withMessage('Invalid currency'),
    body('stock')
        .isNumeric()
        .withMessage('Stock must be a number')
        .custom((value) => value >= 0)
        .withMessage('Stock must be a positive number'),
    body('variants')
        .optional()
        .custom((value) => {
            if (value === undefined || value === null || value === '') {
                return true;
            }

            if (typeof value === 'string') {
                try {
                    value = JSON.parse(value);
                } catch (error) {
                    throw new Error('Variants must be valid JSON');
                }
            }

            if (!Array.isArray(value) || value.length === 0) {
                throw new Error(
                    'At least one variant is required when variants are provided',
                );
            }

            for (const variant of value) {
                if (!variant || typeof variant !== 'object') {
                    throw new Error('Each variant must be an object');
                }

                if (
                    !variant.attributes ||
                    typeof variant.attributes !== 'object'
                ) {
                    throw new Error('Variant attributes are required');
                }

                if (
                    variant.stock === undefined ||
                    variant.stock === null ||
                    variant.stock === ''
                ) {
                    throw new Error('Variant stock is required');
                }

                if (
                    Number.isNaN(Number(variant.stock)) ||
                    Number(variant.stock) < 0
                ) {
                    throw new Error('Variant stock must be a positive number');
                }

                if (!variant.price || typeof variant.price !== 'object') {
                    throw new Error('Variant price is required');
                }

                if (
                    variant.price.amount === undefined ||
                    variant.price.amount === null ||
                    variant.price.amount === ''
                ) {
                    throw new Error('Variant price amount is required');
                }

                if (
                    Number.isNaN(Number(variant.price.amount)) ||
                    Number(variant.price.amount) < 0
                ) {
                    throw new Error(
                        'Variant price amount must be a positive number',
                    );
                }

                if (
                    !variant.price.currency ||
                    !['USD', 'INR', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'].includes(
                        variant.price.currency,
                    )
                ) {
                    throw new Error('Variant price currency is invalid');
                }
            }

            return true;
        }),

    validateRequest,
];
