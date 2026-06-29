import multer from 'multer';
import { sendResponse } from '../utils/response.utlis.js';

// Configure multer to store files in memory
const storage = multer.memoryStorage();

// File filter to restrict uploads to images only
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        sendResponse({
            res: req.res,
            statusCode: 400,
            message: 'Invalid file type. Only images are allowed.',
            success: false,
            error: 'Invalid file type. Only images are allowed.',
        });
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
};

// Create the multer upload instance
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter,
});

export default upload;
