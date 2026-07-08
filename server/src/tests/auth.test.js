import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app.js';
import userModel from '../models/user.model.js';
import redis from '../config/cache.js';

// Mock Redis client
vi.mock('../config/cache.js', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

// Mock User Model
vi.mock('../models/user.model.js', () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
    findById: vi.fn().mockImplementation(() => ({
      lean: vi.fn().mockResolvedValue(null),
    })),
    findByIdAndUpdate: vi.fn(),
  },
}));

// Mock Mail Service
vi.mock('../services/mail/mail.service.js', () => ({
  sendEmail: vi.fn().mockResolvedValue('email sent successfully'),
}));

describe('Auth Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redis.get.mockResolvedValue(null);
  });

  describe('POST /api/auth/register', () => {
    const validUserPayload = {
      email: 'testbuyer@example.com',
      password: 'Password123!',
      contact: '9876543210',
      fullname: 'Test Buyer',
    };

    it('should register a new buyer user successfully', async () => {
      // Setup mock behavior
      userModel.findOne.mockResolvedValue(null); // User does not exist yet
      userModel.create.mockResolvedValue({
        _id: 'mocked-id-123',
        email: validUserPayload.email,
        contact: validUserPayload.contact,
        fullname: validUserPayload.fullname,
        role: 'buyer',
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.user).toBeDefined();
      expect(response.body.user.role).toBe('buyer');
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should register a seller user successfully when isSeller is true', async () => {
      userModel.findOne.mockResolvedValue(null);
      userModel.create.mockResolvedValue({
        _id: 'mocked-id-seller',
        email: validUserPayload.email,
        contact: validUserPayload.contact,
        fullname: validUserPayload.fullname,
        role: 'seller',
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...validUserPayload, isSeller: true });

      expect(response.status).toBe(201);
      expect(response.body.user.role).toBe('seller');
    });

    it('should fail if user already exists (409 Conflict)', async () => {
      userModel.findOne.mockResolvedValue({ _id: 'existing-id' });

      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserPayload);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    const loginPayload = {
      email: 'testbuyer@example.com',
      password: 'Password123!',
    };

    it('should log in successfully with correct credentials', async () => {
      const comparePasswordMock = vi.fn().mockResolvedValue(true);
      const mockUser = {
        _id: 'mocked-id-123',
        email: loginPayload.email,
        contact: '9876543210',
        fullname: 'Test Buyer',
        role: 'buyer',
        password: 'hashed-password',
        comparePassword: comparePasswordMock,
      };

      // Mock chain: findOne().select()
      const selectMock = vi.fn().mockResolvedValue(mockUser);
      userModel.findOne.mockReturnValue({
        select: selectMock,
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginPayload);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User logged in successfully');
      expect(response.body.user.email).toBe(loginPayload.email);
      expect(response.headers['set-cookie']).toBeDefined();
      expect(comparePasswordMock).toHaveBeenCalledWith(loginPayload.password);
    });

    it('should return 401 Unauthorized if user is not found', async () => {
      userModel.findOne.mockReturnValue({
        select: vi.fn().mockResolvedValue(null),
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginPayload);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return 401 Unauthorized if password does not match', async () => {
      const comparePasswordMock = vi.fn().mockResolvedValue(false);
      const mockUser = {
        _id: 'mocked-id-123',
        email: loginPayload.email,
        password: 'hashed-password',
        comparePassword: comparePasswordMock,
      };

      userModel.findOne.mockReturnValue({
        select: vi.fn().mockResolvedValue(mockUser),
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginPayload);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('GET /api/auth/get-me', () => {
    it('should return user details if authenticated', async () => {
      const mockUser = {
        _id: 'mocked-id-123',
        email: 'testbuyer@example.com',
        fullname: 'Test Buyer',
        contact: '9876543210',
        role: 'buyer',
      };

      userModel.findById.mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockUser),
      });

      // Generate a mock JWT token
      const token = jwt.sign(
        { _id: mockUser._id, role: mockUser.role },
        process.env.JWT_SECRET || 'testsecret'
      );

      const response = await request(app)
        .get('/api/auth/get-me')
        .set('Cookie', [`token=${token}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(mockUser.email);
    });

    it('should return 400 if token cookie is missing', async () => {
      const response = await request(app).get('/api/auth/get-me');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('token not found');
    });

    it('should return 401 if token is blacklisted in Redis', async () => {
      const token = jwt.sign(
        { _id: 'mocked-id-123', role: 'buyer' },
        process.env.JWT_SECRET || 'testsecret'
      );

      redis.get.mockResolvedValue('blacklisted-timestamp');

      const response = await request(app)
        .get('/api/auth/get-me')
        .set('Cookie', [`token=${token}`]);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Token has been blacklisted');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should log out successfully and clear cookie', async () => {
      const token = jwt.sign(
        { _id: 'mocked-id-123', role: 'buyer' },
        process.env.JWT_SECRET || 'testsecret'
      );

      redis.set.mockResolvedValue('OK');

      const response = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', [`token=${token}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User logged out successfully');
      expect(response.headers['set-cookie']).toBeDefined();
      expect(redis.set).toHaveBeenCalled();
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    it('should send a password reset email if user exists', async () => {
      userModel.findOne.mockResolvedValue({
        _id: 'mocked-user-id',
        email: 'testbuyer@example.com',
        fullname: 'Test Buyer',
      });

      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'testbuyer@example.com' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Password reset email sent successfully');
    });

    it('should fail if user is not found', async () => {
      userModel.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'nonexistent@example.com' });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User not found');
    });
  });
});
