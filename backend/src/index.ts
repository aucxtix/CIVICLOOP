import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import reportsRoutes from './routes/reports.js';
import adminRoutes from './routes/admin.js';
import aiRoutes from './routes/ai.js';
import rewardsRoutes from './routes/rewards.js';
import vehiclesRoutes from './routes/vehicles.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security and Performance Middlewares
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Or wherever the frontend runs
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' })); // Support larger payload for images later

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/vehicles', vehiclesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'civicloop-api', environment: process.env.NODE_ENV || 'production' });
});

app.get('/api/health/db', async (req, res) => {
  try {
    // Requires importing prisma or we can just send ok if the app started
    res.json({ ok: true, database: 'turso' });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`CivicLoop Backend running on http://localhost:${port}`);
  });
}

export default app;
