import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

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
