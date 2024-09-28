import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // Importing the DB connection
import itemRoutes from './routes/itemRoutes.js'; // Importing the routes

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/items', itemRoutes);

app.use('/', (req, res) => {
    res.send("Connected to server")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
