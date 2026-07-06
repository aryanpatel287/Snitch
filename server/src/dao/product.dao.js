import productModel from '../models/product.model.js';

export const stockOfProduct = async (productId, variantId) => {
    try {
        const product = await productModel.findById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        if (variantId) {
            const variant = product.variants.find(
                (v) => v._id.toString() === variantId,
            );
            if (!variant) {
                throw new Error('Variant not found');
            }
            return variant.stock;
        }

        return product.stock;
    } catch (error) {
        console.error(error);
        return 0;
    }
};
