import categoryModel from '../models/category.model.js';

async function findAllCategories() {
    const categories = await categoryModel
        .find({ isActive: true })
        .populate('children')
        .exec();

    return categories;
}

export { findAllCategories };
