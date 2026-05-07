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

export const config = {
    //Server config
    SERVER_URL: process.env.SERVER_URL,
    SERVER_PORT: process.env.SERVER_PORT,

    //Database config
    MONGO_URI: process.env.MONGO_URI,

    //Client config
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,

    //OTHERS
    JWT_SECRET: process.env.JWT_SECRET,
};
