import { config } from '../config/config.js';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

/**
 * @desc Send token response after successful registration or login
 */
async function sendTokenResponse(user, res) {
    const token = jwt.sign(
        {
            _id: user._id,
        },
        config.JWT_SECRET,
        { expiresIn: '7d' },
    );

    res.cookie('token', token);

    res.status(200).json({
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

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { email, password, contact, fullname }
 */
async function RegsiterUserController(req, res) {
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

        const user = userModel.create({
            email,
            password,
            contact,
            fullname,
            role: isSeller ? 'seller' : 'buyer',
        });

        sendTokenResponse(user, (message = 'User regsitered successfully'));
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error',
            success: false,
        });
    }
}

export { RegsiterUserController };
