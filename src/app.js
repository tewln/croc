import express from 'express';
import patientRoutes from './routes/PatientRoutes.js';

const app = express();

app.use(express.json());
app.use('/api', patientRoutes);

export default app;