import dotenv from 'dotenv';
import app from './app.js';
dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://${HOST}:${PORT}`);
});