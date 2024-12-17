import express from 'express';
import authRoutes from './routes/auth.route.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.post('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Your app is running on port ${PORT}`);
});
