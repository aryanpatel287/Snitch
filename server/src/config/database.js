import mongoose from 'mongoose';
import { config } from './config.js';

const connectToDb = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log('Server connected to database successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDb;
