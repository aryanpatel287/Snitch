import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        price: {
            amount: {
                type: Number,
                required: true,
            },
            currency: {
                type: String,
                required: true,
                enum: ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'],
                default: 'INR',
            },
        },
        images: [
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
        ],
    },
    { timestamps: true },
);

const productModel = mongoose.model('products', productSchema);

export default productModel;
