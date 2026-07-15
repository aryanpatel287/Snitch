import mongoose from 'mongoose';
const imageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        thumbnailUrl: {
            type: String,
        },
        alt: {
            type: String,
            required: true,
        },
    },
    { _id: false },
);

export default imageSchema;
