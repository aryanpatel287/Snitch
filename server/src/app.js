import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';
import authRouter from './routes/auth.routes.js';

const app = express();

// Server Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
    cors({
        origin: config.CLIENT_ORIGIN,
        credentials: true,
    }),
);

// Routes setup
app.use('/api/auth', authRouter);

export default app;
