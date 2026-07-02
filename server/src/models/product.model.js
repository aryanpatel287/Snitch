import mongoose from 'mongoose';
import priceSchema from './price.schema.js';

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
            type: priceSchema,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
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
        variants: [
            {
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
                attributes: {
                    type: Map,
                    required: true,
                },
                stock: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: priceSchema,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true },
);

const productModel = mongoose.model('products', productSchema);

export default productModel;
