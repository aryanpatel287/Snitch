import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

/**
 * Uploads a file to ImageKit
 * @param {Object} options - The options for uploading the file
 * @param {Buffer} options.buffer - The buffer of the file to upload
 * @param {String} options.fileName - The name of the file to upload
 * @param {String} options.folder - The folder to upload the file to
 * @returns {Promise<Object>} - The response from ImageKit
 */
export async function uploadFileToImageKit({ buffer, fileName, folder = '' }) {
    try {
        const response = await client.files.upload({
            file: await ImageKit.toFile(buffer),
            fileName,
            folder: `snitch/${folder}`,
        });
        return response;
    } catch (error) {
        console.error('Error uploading image to ImageKit', error);
        throw new Error('Failed to upload image');
    }
}
