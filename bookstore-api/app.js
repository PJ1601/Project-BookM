import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import { authenticateToken } from './middleware/authMiddleware.js';
import logger from './middleware/logger.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/books', authenticateToken, bookRoutes);

app.get('/', (req, res) => res.send('📚 Bookstore API is live!'));

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
