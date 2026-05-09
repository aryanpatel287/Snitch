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

    validateRequest,
];
