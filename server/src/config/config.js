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
};
