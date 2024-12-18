import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import dbConnection from './db/db.connection.js';
dbConnection();

import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import linkifyRoutes from './routes/linkify.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);
app.use('/api/linkify', linkifyRoutes);

app.listen(PORT, () => {
  console.log(`Your app is running on port ${PORT}`);
});
