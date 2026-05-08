import { Router } from 'express';

import {
    validateRegister,
    validateLogin,
} from '../validators/auth.validator.js';

import {
    loginUserController,
    RegsiterUserController,
    googleAuthController,
    getMeController,
} from '../controllers/auth.controller.js';

import { authUser } from '../middlewares/auth.middleware.js';

import passport from 'passport';
import { config } from '../config/config.js';

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

/**
 * @route GET /api/auth/google
 * @desc Authenticate user with Google OAuth
 * @access Public
 */
authRouter.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);

/**
 * @route GET /api/auth/google/callback
 * @desc Google OAuth callback URL
 * @access Public
 */
authRouter.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect:
            config.NODE_ENV == 'DEVELOPMENT'
                ? `${config.CLIENT_ORIGIN}/login`
                : '/login',
    }),
    googleAuthController,
);

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user
 * @access Private
 */
authRouter.get('/get-me', authUser, getMeController);

export default authRouter;
