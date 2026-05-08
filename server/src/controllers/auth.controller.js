import { config } from '../config/config.js';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

/**
 * @desc Send token response after successful registration or login
 */
async function sendTokenResponse({ user, message, isRegister }, res) {
    const token = jwt.sign(
        {
            _id: user._id,
        },
        config.JWT_SECRET,
        { expiresIn: '7d' },
    );

    res.cookie('token', token);

    res.status(isRegister ? 201 : 200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role,
        },
    });
}

async function checkTokenExists(req, res) {
    const token = req.cookies?.token;

    if (!token) {
        return;
    }
    return res.status(200).json({
        message: 'User already logged in',
        success: true,
    });
}

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { email, password, contact, fullname }
 */
async function RegsiterUserController(req, res) {
    await checkTokenExists(req, res);

    const { email, password, contact, fullname, isSeller } = req.body;
    try {
        const isUserExists = await userModel.findOne({
            $or: [{ email }, { contact }],
        });

        if (isUserExists) {
            return res.status(409).json({
                message: 'User already exists',
                success: false,
            });
        }

        const user = await userModel.create({
            email,
            password,
            contact,
            fullname,
            role: isSeller ? 'seller' : 'buyer',
        });

        return await sendTokenResponse(
            { user, message: 'User regsitered successfully', isRegister: true },
            res,
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error',
            success: false,
        });
    }
}

/**
 * @route POST /api/auth/login
 * @desc Login user and return token
 * @access Public
 * @body { email, password }
 */
async function loginUserController(req, res) {
    await checkTokenExists(req, res);

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user || !user.password) {
        return res.status(401).json({
            message: 'Invalid credentials',
            success: false,
        });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(401).json({
            message: 'Invalid credentials',
            success: false,
        });
    }

    return await sendTokenResponse(
        { user, message: 'User logged in successfully', isRegister: false },
        res,
    );
}

export { RegsiterUserController, loginUserController };
