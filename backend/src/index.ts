import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/auth';
import cors from 'cors';
import serviceRoutes from './routes/service';
import appointmentRoutes from './routes/appointment';
import providerRoutes from './routes/provider';
import rateLimit from 'express-rate-limit';

const app = express();
const port = Number(process.env.PORT) || 3000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(cors({ origin: clientOrigin, credentials: true }));

// Global Rate Limiter
// 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(globalLimiter);

// Auth Rate Limiter
// 10 requests per 15 minutes per IP (Brute-force protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});


app.use('/auth', authLimiter, authRoutes);
app.use('/services', serviceRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/providers', providerRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
