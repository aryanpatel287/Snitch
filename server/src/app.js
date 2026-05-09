import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import authRouter from './routes/auth.routes.js';
import productRouter from './routes/product.routes.js';

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

//Googe OAuth setup
app.use(passport.initialize());

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: `/api/auth/google/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            //Here we can handle the user profile returned by Google and create or find a user in our database
            //For simplicity, we'll just return the profile
            return done(null, profile);
        },
    ),
);

// Routes setup
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);

export default app;
