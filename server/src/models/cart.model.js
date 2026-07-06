import mongoose from 'mongoose';
import priceSchema from './price.schema.js';

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    items: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                    required: true,
                },
                variant: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products.variants',
                },
                quantity: {
                    type: Number,
                    default: 1,
                    required: true,
                },
                price: {
                    type: priceSchema,
                    required: true,
                },
            },
        ],
    },
});

const cardModel = mongoose.model('carts', cartSchema);

export default cardModel;
