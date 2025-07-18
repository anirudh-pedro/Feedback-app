import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);  


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Feedback App API');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
