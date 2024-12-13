// backend/server.js
import express from 'express';
import cors from 'cors';
import competitionsRoute from './routes/competitions.js';
import db from './db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotte
app.use('/api/competitions', competitionsRoute);

// Configura la porta
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
