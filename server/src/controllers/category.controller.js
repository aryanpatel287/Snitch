import { findAllCategories } from '../dao/category.dao.js';
import { sendResponse } from '../utils/response.utlis.js';

async function getAllCategoriesController(req, res) {
    try {
        const categories = await findAllCategories();

        sendResponse({
            res,
            success: true,
            statusCode: 200,
            message: 'Categories fetched successfully',
            categories,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

export { getAllCategoriesController };
