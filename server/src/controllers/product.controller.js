import productModel from '../models/product.model.js';
import { sendResponse } from '../utils/response.utlis.js';
import { uploadFileToImageKit } from '../services/storage.service.js';

/**
 * @route POST /api/products/create-product
 * @description Create a new product
 * @access Private (sellers only)
 * @body { title, description, price: { amount, currency }, images: [{ url, alt }] }
 */
async function createProductContoller(req, res) {
    const { title, description, priceAmount, priceCurrency } = req.body;

    const seller = req.user._id;

    const images = await Promise.all(
        req.files.map(async (file) => {
            const uploadResult = await uploadFileToImageKit({
                buffer: file.buffer,
                fileName: file.originalname,
                folder: `products/${seller}`,
            });

            return {
                url: uploadResult.url,
                thumbnailUrl: uploadResult.thumbnailUrl,
                alt: title,
            };
        }),
    );

    try {
        const product = await productModel.create({
            title,
            description,
            price: {
                amount: priceAmount,
                currency: priceCurrency || 'INR',
            },
            images,
            seller,
        });

        sendResponse({
            res,
            statusCode: 201,
            message: 'Product created successfully',
            success: true,
            product,
        });
    } catch (error) {
        console.error('Error creating product', error);

        sendResponse({
            res,
            statusCode: 500,
            message: 'Failed to create product',
            success: false,
            error: 'Failed to create product',
        });
    }
}

/**
 * @route GET /api/products/get-products
 * @description Get all products
 * @access Private (sellers only)
 * @body No body required
 */
async function getProductsController(req, res) {
    const seller = req.user._id;

    try {
        const products = await productModel.find({ seller }).populate('seller');

        return sendResponse({
            res,
            statusCode: 200,
            message: 'Products fetched successfully',
            success: true,
            products,
        });
    } catch (error) {
        console.error('Error fetching products', error);

        return sendResponse({
            res,
            statusCode: 500,
            message: 'Failed to fetch products',
            success: false,
            error: 'Failed to fetch products',
        });
    }
}

export { createProductContoller, getProductsController };
