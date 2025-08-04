
import express from 'express';
import authRoutes from './routes/auth.route.js';   
import dotenv from 'dotenv';
import { getUserList } from './controller/user.controller.js'; // Importing the user controller
import cors from 'cors';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

dotenv.config(); // Load environment variables from .env file

// Helps read JSON data from the request body
app.use(express.json());

app.use('/api/auth', authRoutes); 
app.use('/api/user',getUserList); 

export default app;
