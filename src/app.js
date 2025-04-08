import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import patientRoutes from './routes/PatientRoutes.js';
import userRoutes from './routes/UserRoutes.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 12,
        }
    })
);

app.use((req, res, next) => {
    const publicRoutes = ['/api/user/login', 'api/user/registration'];
    if (publicRoutes.includes(req.path) || req.session.isAuthentificated) {
      next();
    } else {
      res.status(401).json({ error: 'Требуется авторизация' });
    }
});

app.use('/api', userRoutes)
app.use('/api', patientRoutes);

export default app;