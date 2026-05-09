import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI IS NOT DEFINED IN THE ENVIRONMENTAL VAIRABLES');
}

if (!process.env.CLIENT_ORIGIN) {
    throw new Error(
        'CLIENT_ORIGIN IS NOT DEFINED IN THE ENVIRONMENTAL VAIRABLES',
    );
}

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET IS NOT DEFINED IN THE ENVIRONMENTAL VARIABLES');
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error(
        'GOOGLE_CLIENT_ID IS NOT DEFINED IN THE ENVIRONMENTAL VARIABLES',
    );
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error(
        'GOOGLE_CLIENT_SECRET IS NOT DEFINED IN THE ENVIRONMENTAL VARIABLES',
    );
}

if (!process.env.GOOGLE_USER) {
    throw new Error(
        'GOOGLE_USER IS NOT DEFINED IN THE ENVIRONMENTAL VARIABLES',
    );
}

if (!process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error(
        'GOOGLE_REFRESH_TOKEN IS NOT DEFINED IN THE ENVIRONMENTAL VARIABLES',
    );
}

if (
    !process.env.REDIS_HOST ||
    !process.env.REDIS_PORT ||
    !process.env.REDIS_PASSWORD
) {
    throw new Error(
        'REDIS_HOST, REDIS_PORT, REDIS_PASSWORD ARE NOT DEFINED IN THE ENVIRONMENTAL VARIABLES',
    );
}

export const config = {
    //Server config
    SERVER_URL: process.env.SERVER_URL,
    SERVER_PORT: process.env.SERVER_PORT,
    NODE_ENV: process.env.NODE_ENV || 'DEVELOPMENT',

    //Database config
    MONGO_URI: process.env.MONGO_URI,

    //Client config
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,

    //OTHERS
    JWT_SECRET: process.env.JWT_SECRET,

    //Google OAuth config
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_USER: process.env.GOOGLE_USER,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,

    //Redis config
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,

    //ImageKit config
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
};
