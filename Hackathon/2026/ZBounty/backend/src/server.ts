import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { setupInMemoryDb } from './models/mockDb';

// Routes
import authRoutes from './routes/auth.routes';
import bountyRoutes from './routes/bounty.routes';
import zcashRoutes from './routes/zcash.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('FATAL ERROR: MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

// Disable Mongoose command buffering so queries fail immediately (or use mock) instead of waiting for timeout
mongoose.set('bufferCommands', false);

// Setup in-memory mock db immediately because Atlas is not whitelisted in this local env
setupInMemoryDb();

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    // Only log the message to avoid verbose stack trace on expected connection failure
    console.warn('MongoDB connection failed, running in mock in-memory mode:', err.message);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bounties', bountyRoutes);
app.use('/api/zcash', zcashRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ZBounty API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
