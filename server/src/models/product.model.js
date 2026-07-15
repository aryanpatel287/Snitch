import mongoose from 'mongoose';
import priceSchema from './price.schema.js';
import imageSchema from './image.schema.js';

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
        gender: {
            type: String,
            required: true,
            enum: ['men', 'women', 'kids'],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            required: true,
        },
        images: [
            {
                type: imageSchema,
                required: true,
            },
        ],
        tags: {
            type: [String],
            default: [],
        },
        variants: [
            {
                images: [
                    {
                        type: imageSchema,
                        required: true,
                    },
                ],
                attributes: {
                    type: Map,
                    of: String,
                    required: true,
                },
                stock: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: priceSchema,
                },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const productModel = mongoose.model('products', productSchema);

export default productModel;
