import { Router } from 'express';

import {
    validateRegister,
    validateLogin,
} from '../validators/auth.validator.js';

import {
    loginUserController,
    RegsiterUserController,
} from '../controllers/auth.controller.js';

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { email, password, contact, fullname }
 */
authRouter.post('/register', validateRegister, RegsiterUserController);

/**
 * @route POST /api/auth/login
 * @desc Login user and return token
 * @access Public
 * @body { email, password }
 */
authRouter.post('/login', validateLogin, loginUserController);

export default authRouter;
