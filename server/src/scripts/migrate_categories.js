import mongoose from 'mongoose';
import { config } from '../config/config.js';
import connectToDb from '../config/database.js';
import productModel from '../models/product.model.js';
import categoryModel from '../models/category.model.js';

// The products list with ids and titles provided by user
const productsList = [
    {
        "_id": "6a4d21b28e8dc7cee2e37a7e",
        "title": "Snitch Men Smart Slim Fit Textured Casual Shirt"
    },
    {
        "_id": "6a4d21ba8e8dc7cee2e37a96",
        "title": "Snitch Men Smart Spread Collar Solid Casual Shirt"
    },
    {
        "_id": "6a4d21c28e8dc7cee2e37aae",
        "title": "Snitch Mauve & White Striped Classic Slim Fit Opaque Casual Shirt"
    },
    {
        "_id": "6a4d21cb8e8dc7cee2e37ac6",
        "title": "Snitch Blue Classic Slim Fit Vertical Stripes Button-Down Collar Casual Shirt"
    },
    {
        "_id": "6a4d21d28e8dc7cee2e37ade",
        "title": "Snitch White Classic Slim Fit Vertical Striped Cotton Casual Shirt"
    },
    {
        "_id": "6a4d21d78e8dc7cee2e37af6",
        "title": "Snitch Slim Fit Spread Collar Short Sleeves Casual Shirt"
    },
    {
        "_id": "6a4d21de8e8dc7cee2e37b0e",
        "title": "Snitch Men Casual Shirt"
    },
    {
        "_id": "6a4d21e48e8dc7cee2e37b2a",
        "title": "Snitch Men Striped Casual Shirt"
    },
    {
        "_id": "6a4d21eb8e8dc7cee2e37b46",
        "title": "Snitch Men Classic Button-Down Collar Solid Cotton Casual Shirt"
    },
    {
        "_id": "6a4d21f28e8dc7cee2e37b62",
        "title": "Snitch Embroidery Polo Neck Cotton Oversized T-shirt"
    },
    {
        "_id": "6a4d21f98e8dc7cee2e37b7a",
        "title": "Snitch Men Typography Printed Polo Collar Applique T-shirt"
    },
    {
        "_id": "6a4d22018e8dc7cee2e37b8e",
        "title": "Snitch Olive Self Design Polo Collar Casual T-shirt"
    },
    {
        "_id": "6a4d22078e8dc7cee2e37ba6",
        "title": "Snitch Oversized Polo Collar Drop-Shoulder Sleeves Pure Cotton T-Shirt"
    },
    {
        "_id": "6a4d220e8e8dc7cee2e37bc2",
        "title": "Snitch Black Textured Polo Collar Slim Fit Cotton T-shirt"
    },
    {
        "_id": "6a4d22168e8dc7cee2e37bde",
        "title": "Snitch Men Solid Polo Collar Slim Fit T-shirt"
    },
    {
        "_id": "6a4d221e8e8dc7cee2e37bf6",
        "title": "Snitch Men Solid Round Neck Pure Cotton Relaxed Fit T-shirt"
    },
    {
        "_id": "6a4d22248e8dc7cee2e37c12",
        "title": "Snitch Textured Polo Collar Drop-Shoulder Sleeves Pure Cotton T-Shirt"
    },
    {
        "_id": "6a4d222c8e8dc7cee2e37c2e",
        "title": "Snitch Men Printed Drop-Shoulder Sleeves T-shirt"
    },
    {
        "_id": "6a4d22328e8dc7cee2e37c42",
        "title": "Snitch Men Flared Mid-Rise Low Distress Light Fade Jeans"
    },
    {
        "_id": "6a4d22388e8dc7cee2e37c5e",
        "title": "Snitch Men Straight Fit Mid-Rise Light Fade Jeans"
    },
    {
        "_id": "6a4d223f8e8dc7cee2e37c7a",
        "title": "Snitch Men Straight Fit Mid-Rise Stretchable Jeans"
    },
    {
        "_id": "6a4d22458e8dc7cee2e37c96",
        "title": "Snitch Men Grey Mid-Rise Clean Look Pure Cotton Jeans"
    },
    {
        "_id": "6a4d224c8e8dc7cee2e37cae",
        "title": "Snitch Men Straight Fit Mid-Rise Light Fade Jeans"
    },
    {
        "_id": "6a4d22528e8dc7cee2e37cca",
        "title": "Snitch Men Mid-Rise Low Distress Light Fade Jeans"
    },
    {
        "_id": "6a4d22598e8dc7cee2e37ce6",
        "title": "Snitch Men Straight Fit Mid-Rise Light Fade Jeans"
    },
    {
        "_id": "6a4d225f8e8dc7cee2e37d02",
        "title": "Snitch Men Mid-rise Pure Cotton Baggy Jeans"
    },
    {
        "_id": "6a4d22658e8dc7cee2e37d1e",
        "title": "Snitch Men Blue Baggy Fit Pure Cotton Jeans"
    }
];

async function runMigration() {
    try {
        console.log('Connecting to database...');
        await connectToDb();
        console.log('Connected successfully!');

        // Define target categories
        const targetCategories = [
            { name: 'Shirts', slug: 'shirts' },
            { name: 'T-shirts', slug: 't-shirts' },
            { name: 'Jeans', slug: 'jeans' }
        ];

        console.log('Creating/retrieving categories...');
        const categoryMap = {};
        for (const cat of targetCategories) {
            let doc = await categoryModel.findOne({ slug: cat.slug });
            if (!doc) {
                doc = await categoryModel.create(cat);
                console.log(`Created category: "${cat.name}"`);
            } else {
                console.log(`Category "${cat.name}" already exists.`);
            }
            categoryMap[cat.slug] = doc._id;
        }

        console.log('\nStarting product updates...');
        let updatedCount = 0;

        for (const p of productsList) {
            let targetCategorySlug = '';
            const titleLower = p.title.toLowerCase();

            if (titleLower.includes('t-shirt') || titleLower.includes('tshirt')) {
                targetCategorySlug = 't-shirts';
            } else if (titleLower.includes('shirt')) {
                targetCategorySlug = 'shirts';
            } else if (titleLower.includes('jeans')) {
                targetCategorySlug = 'jeans';
            } else {
                console.warn(`Unrecognized category for product: "${p.title}"`);
                continue;
            }

            const categoryId = categoryMap[targetCategorySlug];
            
            // Update this product
            const result = await productModel.findByIdAndUpdate(
                p._id,
                {
                    category: categoryId,
                    gender: 'men' // default to 'men' based on title and specifications
                },
                { new: true }
            );

            if (result) {
                console.log(`Updated: "${p.title}" -> Category: "${targetCategorySlug}"`);
                updatedCount++;
            } else {
                console.log(`Product with ID ${p._id} not found in DB.`);
            }
        }

        console.log(`\nMigration complete. Successfully updated ${updatedCount} products.`);
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from database.');
    }
}

runMigration();
