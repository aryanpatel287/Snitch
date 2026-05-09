import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import { sendResponse } from '../utils/response.utlis.js';

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return await sendResponse({
            res,
            statusCode: 400,
            message: 'Invalid token',
            success: false,
            error: 'token not found',
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;

        return next();
    } catch (error) {
        console.log(error);

        return await sendResponse({
            res,
            statusCode: 401,
            message: 'Unauthorized',
            success: false,
            error: 'Invalid token',
        });
    }
}

// Middleware to check if the user is a seller
// This middleware should be used after authUser middleware to ensure that req.user is available
export async function authSeller(req, res, next) {
    const user = req.user;

    if (user.role !== 'seller') {
        return await sendResponse({
            res,
            statusCode: 403,
            message: 'Forbidden',
            success: false,
            error: 'You do not have permission to access this resource',
        });
    }
    return next();
}

export { authUser };
