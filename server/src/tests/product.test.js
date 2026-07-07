import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app.js';
import productModel from '../models/product.model.js';
import redis from '../config/cache.js';
import { uploadFileToImageKit } from '../services/storage.service.js';

// Mock Redis client
vi.mock('../config/cache.js', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

// Mock Mongoose Product Model
vi.mock('../models/product.model.js', () => ({
  default: {
    create: vi.fn(),
    find: vi.fn(),
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
  },
}));

// Mock storage service
vi.mock('../services/storage.service.js', () => ({
  uploadFileToImageKit: vi.fn(),
}));

describe('Product & Variant Endpoints', () => {
  const sellerId = 'mocked-seller-id-123';
  let token;

  beforeEach(() => {
    vi.clearAllMocks();
    redis.get.mockResolvedValue(null);

    // Generate authenticated seller token
    token = jwt.sign(
      { _id: sellerId, role: 'seller' },
      process.env.JWT_SECRET || 'testsecret'
    );
  });

  describe('POST /api/products/seller/create-product', () => {
    const validProductPayload = {
      title: 'Minimalist Monochrome Mug',
      description: 'Luxury editorial style monochrome mug.',
      priceAmount: 899,
      priceCurrency: 'INR',
      stock: 50,
    };

    it('should fail validation when title is missing', async () => {
      const response = await request(app)
        .post('/api/products/seller/create-product')
        .set('Cookie', [`token=${token}`])
        .send({ ...validProductPayload, title: '' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });

    it('should fail validation when variants are invalid', async () => {
      const response = await request(app)
        .post('/api/products/seller/create-product')
        .set('Cookie', [`token=${token}`])
        .send({
          ...validProductPayload,
          variants: [
            {
              // attributes missing
              stock: 10,
              price: { amount: 899, currency: 'INR' },
            },
          ],
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should create product successfully', async () => {
      // Mock storage service upload
      uploadFileToImageKit.mockResolvedValue({
        url: 'https://ik.imagekit.io/mock/mug.png',
        thumbnailUrl: 'https://ik.imagekit.io/mock/mug_thumb.png',
      });

      // Mock DB save
      productModel.create.mockResolvedValue({
        _id: 'new-product-id',
        ...validProductPayload,
        images: [{ url: 'https://ik.imagekit.io/mock/mug.png', thumbnailUrl: 'https://ik.imagekit.io/mock/mug_thumb.png', alt: validProductPayload.title }],
        seller: sellerId,
        variants: [],
      });

      // Send multipart form-data to simulate file upload
      const response = await request(app)
        .post('/api/products/seller/create-product')
        .set('Cookie', [`token=${token}`])
        .field('title', validProductPayload.title)
        .field('description', validProductPayload.description)
        .field('priceAmount', validProductPayload.priceAmount)
        .field('priceCurrency', validProductPayload.priceCurrency)
        .field('stock', validProductPayload.stock)
        .attach('images', Buffer.from('mock-file-data'), 'mug.png');

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.product).toBeDefined();
      expect(response.body.product.title).toBe(validProductPayload.title);
    });
  });

  describe('PUT /api/products/seller/:productId', () => {
    const updatePayload = {
      title: 'Updated Title',
      stock: 45,
    };

    it('should return 404 when product to update does not exist', async () => {
      productModel.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app)
        .put('/api/products/seller/nonexistent-id')
        .set('Cookie', [`token=${token}`])
        .send(updatePayload);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Product not found');
    });

    it('should update product successfully when it exists', async () => {
      productModel.findByIdAndUpdate.mockResolvedValue({
        _id: 'existing-id',
        title: updatePayload.title,
        stock: updatePayload.stock,
      });

      const response = await request(app)
        .put('/api/products/seller/existing-id')
        .set('Cookie', [`token=${token}`])
        .send(updatePayload);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.product.title).toBe(updatePayload.title);
    });
  });

  describe('POST /api/products/seller/:productId/variants', () => {
    const validVariantPayload = {
      attributes: { size: 'L', color: 'Monochrome Black' },
      stock: 15,
      price: { amount: 999, currency: 'INR' },
    };

    it('should fail validation when variant attributes are missing', async () => {
      const response = await request(app)
        .post('/api/products/seller/existing-id/variants')
        .set('Cookie', [`token=${token}`])
        .send({ ...validVariantPayload, attributes: undefined });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 404 when adding variant to non-existent product', async () => {
      productModel.findById.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/products/seller/nonexistent-id/variants')
        .set('Cookie', [`token=${token}`])
        .send(validVariantPayload);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Product not found');
    });

    it('should create variant successfully when valid', async () => {
      const mockProduct = {
        _id: 'existing-id',
        variants: [],
        save: vi.fn().mockResolvedValue(true),
      };

      productModel.findById.mockResolvedValue(mockProduct);

      const response = await request(app)
        .post('/api/products/seller/existing-id/variants')
        .set('Cookie', [`token=${token}`])
        .send(validVariantPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(mockProduct.variants.length).toBe(1);
      expect(mockProduct.variants[0].stock).toBe(validVariantPayload.stock);
      expect(mockProduct.save).toHaveBeenCalled();
    });
  });
});
