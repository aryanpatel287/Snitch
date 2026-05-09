import { body, validationResult } from 'express-validator';

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validateRegister = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('contact')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('fullname')
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 3 })
    .withMessage('Full name must be at least 3 characters long'),
  body('isSeller')
    .isBoolean()
    .withMessage('isSeller must be a boolean value (true or false)'),

  validateRequest,
];

export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  validateRequest,
];

export const validateForgotPassword = [
  body('email').isEmail().withMessage('Please provide a valid email address'),

  validateRequest,
];

export const validateUpdatePassword = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  validateRequest,
];
