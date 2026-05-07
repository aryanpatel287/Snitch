import { Router } from 'express';
import {
    validateRegister,
    validateLogin,
} from '../validators/auth.validator.js';
import { RegsiterUserController } from '../controllers/auth.controller.js';

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { email, password, contact, fullname }
 */
authRouter.post('/register', validateRegister, RegsiterUserController);

export default authRouter;
