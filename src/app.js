import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import dbConnection from './db/db.connection.js';
dbConnection();

import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import linkifyRoutes from './routes/linkify.route.js';
import adminRoutes from './routes/admin.route.js';
import linkRoutes from './routes/link.route.js';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);
app.use('/api/linkify', linkifyRoutes);
app.use('/api/verify/admin', adminRoutes); // not yet decided but will do work on it soon !
app.use('/api/work/link', linkRoutes); // work --> operations ( crud );

app.listen(PORT, () => {
  console.log(`Your app is running on port ${PORT}`);
});
