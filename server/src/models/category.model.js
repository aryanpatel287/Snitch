import mongoose from 'mongoose';
import imageSchema from './image.schema.js';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    image: {
        type: imageSchema,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        default: null,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    displayOrder: {
        type: Number,
        default: 0,
    },
});

// Virtual property to get direct children only
categorySchema.virtual('children', {
    ref: 'categories',
    localField: '_id',
    foreignField: 'parent',
    match: { isActive: true },
});

const categoryModel = mongoose.model('categories', categorySchema);

export default categoryModel;
