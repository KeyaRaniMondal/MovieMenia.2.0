// force dns to use ipv4 addresses
import { setServers } from 'node:dns/promises'
setServers(['1.1.1.1', '8.8.8.8'])

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim());

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json()); // middleware to parse json data from request body
app.use(cookieParser());

// auth routes: /api/signup, /api/login, /api/fetch-user, /api/logout
app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectToDB();
    console.log(`server is running on port http://localhost:${PORT}`)
});
